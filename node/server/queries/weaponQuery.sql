SELECT 
    event_details.event_id AS id, 
    CONCAT_WS('/', event_details.event_month, event_details.event_day, event_details.event_year) AS 'event date', 
    event_location.country AS country, 
    event_location.province_state AS 'province/state',
    CONCAT(
        '(', 
        event_perpetrator_details.group_name1, 
        '), ', '(', 
        COALESCE(event_perpetrator_details.group_name2, 'N/A'), 
        '), ', '(', 
        COALESCE(event_perpetrator_details.group_name3, 'N/A'), ')'
    ) AS 'perpetrator(s)', 
    event_target_victim_details.target1_id AS target, 
    CONCAT(
        '(', event_weapon_details.weapon1_subtype, '), ', 
        '(', COALESCE(event_weapon_details.weapon2_subtype, 'N/A'), '), ', 
        '(', COALESCE(event_weapon_details.weapon3_subtype, 'N/A'), ')', 
        '(', COALESCE(event_weapon_details.weapon4_subtype, 'N/A'), ')'
    ) AS 'weapon(s)', 
    event_weapon_details.weapon_detail AS detail 
    FROM event_details 
    INNER JOIN event_location ON event_details.event_id = event_location.event_id 
    INNER JOIN event_perpetrator_details ON event_location.event_id = event_perpetrator_details.event_id 
    INNER JOIN event_target_victim_details ON event_perpetrator_details.event_id = event_target_victim_details.event_id 
    INNER JOIN event_weapon_details ON event_target_victim_details.event_id = event_weapon_details.event_id 
    WHERE event_weapon_details.weapon1_type LIKE ? 
    OR event_weapon_details.weapon2_type LIKE ? 
    OR event_weapon_details.weapon3_type LIKE ? 
    OR event_weapon_details.weapon4_type LIKE ? 
    OR event_weapon_details.weapon1_subtype LIKE ? 
    OR event_weapon_details.weapon2_subtype LIKE ? 
    OR event_weapon_details.weapon3_subtype LIKE ? 
    OR event_weapon_details.weapon4_subtype LIKE ?;