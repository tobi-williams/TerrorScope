SELECT 
    event_details.event_id AS id, 
    CONCAT_WS('/', event_details.event_month, event_details.event_day, event_details.event_year) AS 'event date', 
    event_location.country AS country, 
    event_location.province_state AS 'province/state', 
    event_perpetrator_details.group_name1 AS 'major perpetrator', 
    event_target_victim_details.target1_id AS target, 
    CONCAT(
        event_weapon_details.weapon1_type, 
        ' (', COALESCE(event_weapon_details.weapon1_subtype, 'UNKNOWN'), ')'
    ) AS weapon 
    FROM event_details 
    INNER JOIN event_location ON event_details.event_id = event_location.event_id 
    INNER JOIN event_perpetrator_details ON event_location.event_id = event_perpetrator_details.event_id 
    INNER JOIN event_target_victim_details ON event_perpetrator_details.event_id = event_target_victim_details.event_id 
    INNER JOIN event_weapon_details ON event_target_victim_details.event_id = event_weapon_details.event_id 
    WHERE event_location.region LIKE ? 
    OR event_location.country LIKE ? 
    OR event_location.province_state LIKE ? 
    OR event_location.city LIKE ? 
    OR event_location.specific_location LIKE ?;