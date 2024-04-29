SELECT 
    CONCAT_WS('/', event_details.event_month, event_details.event_day, event_details.event_year) AS date, 
    CONCAT_WS(', ', event_location.province_state, event_location.country) AS location, 
    CONCAT(CASE 
                WHEN event_damage_details.public_damage = 1 THEN 'Yes' 
                WHEN event_damage_details.public_damage = 0 THEN 'No' 
                ELSE 'Unknown' 
            END, 
            ', ', 
            coalesce(damage_extent, 'UNKNOWN')
    ) AS damage,
    CONCAT(
            event_damage_details.number_killed, 
            ' (', 
            event_damage_details.number_wounded, 
            ')'
    ) AS numberKilled,
    CASE 
        WHEN damage_summary IS NULL THEN 'UNAVAILABLE'  
        ELSE damage_summary 
    END AS damageSummary,
    CONCAT(
            attack_type1, 
            CASE
                WHEN attack_type2 IS NOT NULL THEN CONCAT(', ', attack_type2)
                ELSE ''
            END,
            CASE
                WHEN attack_type3 IS NOT NULL THEN CONCAT(', ', attack_type3)
                ELSE ''
            END
    ) AS attackType,
    CONCAT(
            CASE
                WHEN number_of_perps = -99 THEN CONCAT('UNKNOWN')
                ELSE number_of_perps
            END,
            ' (',
            CASE
                WHEN number_of_perps_captured = -99 THEN CONCAT('UNKNOWN')
                ELSE number_of_perps_captured
            END,
            ')'
    ) AS numberOfPerpetrators,
    CONCAT(
            CASE
                WHEN is_claimed = 1 THEN 'Yes' 
                WHEN is_claimed = 0 THEN 'No' 
                ELSE 'Unknown'
            END,
            ' (',
            CASE
                WHEN method_of_claim = 'nan' THEN 'UNCLAIMED'
                ELSE method_of_claim
            END,
            ')'
    ) AS methodOfClaim,
    CONCAT(
            group_name1, 
            CASE
                WHEN group_name2 IS NOT NULL THEN CONCAT(', ', group_name2)
                ELSE ''
            END,
            CASE
                WHEN group_name3 IS NOT NULL THEN CONCAT(', ', group_name3)
                ELSE ''
            END
    ) AS perpetratorGroup,
    CONCAT(
            CASE
                WHEN target1_id = 'nan' THEN 'UNKNOWN'
                ELSE target1_id
            END,
            ' (',
            target1_name,
            ', ',
            CASE
                WHEN target1_nationality = 'nan' THEN 'UNKNOWN'
                ELSE target1_nationality
            END,
            ')'
    ) AS target,
    CONCAT(
            weapon1_type, 
            CASE
                WHEN weapon1_subtype IS NOT NULL THEN CONCAT(' (', weapon1_subtype, ')')
                ELSE ' (UNKNOWN)'
            END,
            CASE
                WHEN weapon2_type IS NOT NULL THEN CONCAT(', ', weapon2_type, CASE
                                                                                    WHEN weapon2_subtype IS NOT NULL THEN CONCAT(' (', weapon2_subtype, ')')
                                                                                    ELSE ' (UNKNOWN)' 
                                                                                END
                                                        )
                ELSE ''
            END,
            CASE
                WHEN weapon3_type IS NOT NULL THEN CONCAT(', ', weapon3_type, CASE
                                                                                    WHEN weapon3_subtype IS NOT NULL THEN CONCAT(' (', weapon3_subtype, ')')
                                                                                    ELSE ' (UNKNOWN)' 
                                                                                END
                                                        )
                ELSE ''
            END,
            CASE
                WHEN weapon4_type IS NOT NULL THEN CONCAT(', ', weapon4_type, CASE
                                                                                    WHEN weapon4_subtype IS NOT NULL THEN CONCAT(' (', weapon4_subtype, ')')
                                                                                    ELSE ' (UNKNOWN)' 
                                                                                END
                                                        )
                ELSE ''
            END
    ) AS weaponsUsed,
    CASE
        WHEN weapon_detail = 'nan' THEN 'UNAVAILABLE'
        ELSE weapon_detail
    END AS weaponDetail,
    CASE
        WHEN event_details.motive IS NULL THEN 'UNKNOWN'
        ELSE event_details.motive
    END AS motive,
    CASE
        WHEN summary IS NULL THEN 'UNAVAILABLE'
        ELSE summary
    END AS summary,
    latitude,
    longitude
    FROM event_details 
    INNER JOIN event_location ON event_details.event_id = event_location.event_id 
    INNER JOIN event_perpetrator_details ON event_location.event_id = event_perpetrator_details.event_id 
    INNER JOIN event_target_victim_details ON event_perpetrator_details.event_id = event_target_victim_details.event_id 
    INNER JOIN event_weapon_details ON event_target_victim_details.event_id = event_weapon_details.event_id
    INNER JOIN event_attack_details ON event_weapon_details.event_id = event_attack_details.event_id 
    INNER JOIN event_damage_details ON event_attack_details.event_id = event_damage_details.event_id 
    WHERE event_details.event_id LIKE ?;

