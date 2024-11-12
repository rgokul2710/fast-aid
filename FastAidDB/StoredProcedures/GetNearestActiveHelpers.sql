DROP PROCEDURE IF EXISTS GetNearestActiveHelpers;
CREATE PROCEDURE GetNearestActiveHelpers (IN user_id INT)
BEGIN
    DECLARE user_lat DECIMAL(10, 7);
    DECLARE user_long DECIMAL(10, 7);

    -- Get the latitude and longitude for the given user_id
    SELECT latitude, longitude
    INTO user_lat, user_long
    FROM user_location
    WHERE id = user_id;

    -- Return the top 3 nearest active helpers' IDs, latitude, and longitude
    SELECT h.id AS helper_id,
           hl.latitude,
           hl.longitude,
           (6371 * acos(cos(radians(user_lat)) * cos(radians(hl.latitude)) * cos(radians(hl.longitude) - radians(user_long)) + sin(radians(user_lat)) * sin(radians(hl.latitude)))) AS distance
    FROM helper_location hl
    JOIN helpers h ON hl.id = h.id
    WHERE hl.status = 'active'
    ORDER BY distance ASC
    LIMIT 3;
END;
