// console.log("-- hellow coordinate calculation!, something");

// window.var_one = 1;

// console.log(" - something external script ");


/*
class Calc_coords {

	// --------------  constructor
	// constructor( something_ ){

	// 	console.log(" NEW CLASS! - something_ : "+something_ );
	// }

	// --------------  parameters

	this.one = 1;

	var one = 1;


	// --------------  methods etcs

	var print_one = function(){
		console.log(">>> print one : |"+this.one+"|" );
	}
}


console.log("-- something3 ");

window.calc_coords = new Calc_coords("|||something|||");
window.calc_coords.print_one();

console.log("--- what's something Calc_coords.one? -> "+window.calc_coords.one+" <- " );

*/


/* NOTES ON COORDS GENERATION : 
   --------------------------

   20190813 : 
   	- if doing screen coords coords gen - one needs to think carefully about input
   		- is input a screen image? 
   		- is it the current screen, if so, then what about panning, magnification, etc… ? 
   			- should one calculate the points from the Leaflet-supplied map origin in pixels? 
   			( and then what happens with offscreen pixels )
*/



var Calc_coords = function( input_ ){

	// --------------  variaables

	// --- who am i ? :) 
	var root_me = this;

	// --- test variables
	this.one = 1; 
	this.input = input_;


	// --- some geometry

	this.earths_circumference__around_poles__in_km = 40007;
	this.HALF_earths_circumference__around_poles__in_km = this.earths_circumference__around_poles__in_km/2;
	this.earths_circumference__around_equator__in_km = 40075;
	this.HALF_earths_circumference__around_equator__in_km = this.earths_circumference__around_equator__in_km/2;

	this.earth_radius = 6378;


	// 
	this.half_pi = Math.PI/2 ;
	this.two_pi = Math.PI*2;


	// --- objects 

	//
	this.settings_n_data_objects_array = [];



	// --------------  methods TEST methods TEST

	this.print_input = function(){
		console.log(">>> print_input something : |"+this.input+"|" );
	}

	this.print_input_EXTERNAL = function(){
		console.log(">>> print_input_EXTERNAL() something : |"+this.input+"|" );
	}


	// TEST - the intersection functionalities 
	this.intersection_testing01 = function(){
		console.log(">>>> intersection_testing01()");

		// -- copy today's sensor coords over into a settings object 
		this.get__given_day_sensor_data_from_main_object__as_settings_obj_coords( "today" );

		// -- do an intersection calculation, of the [0] generated grid and the sensor poins
		this.get__points_in_one_settings_obj_that_are_near_points_in_another_settings_obj( calc_coords2.settings_n_data_objects_array[0], calc_coords2.settings_n_data_objects_array[1], 50 );

		// --- test! - get angle needed to produce given distance at given latY angle

		var given_latY_angle = 45;
		var given_distance_needed = 14168; // half the circumferance at that angle ;)
		console.log("--- given_latY_angle : "+given_latY_angle+" | given_distance_needed "+given_distance_needed );

		var given_degree_angle_in_radians = this.get__radians_angle_from_map_degree_angle( given_latY_angle );
		console.log("\t --- given_degree_angle_in_radians : "+given_degree_angle_in_radians );
		
		var radius_at_given_latY_angle = this.get__earth_radius_at_given_latY_angle_in_km( given_degree_angle_in_radians );
		console.log("\t --- radius_at_given_latY_angle : "+radius_at_given_latY_angle );

		var circumferance_at_that_angle = this.get__earth_circumferance_given_radius__in_km( radius_at_given_latY_angle );
		console.log("\t --- circumferance_at_that_angle : "+circumferance_at_that_angle );

		var angle_for_needed_distance__as_decimal_of_full_circle = this.get__angle_in_decimals_of_full_circle__needed_to_produce_given_distance__at_given_circumferance( circumferance_at_that_angle, given_distance_needed );
		console.log("\t --- angle_for_needed_distance__as_decimal_of_full_circle : "+angle_for_needed_distance__as_decimal_of_full_circle );

		var angle_as_map_degrees = this.get__angle_as_coordinates_of_map__given_angle_as_decimal_of_full_circle( angle_for_needed_distance__as_decimal_of_full_circle );
		console.log("\t --- angle_as_map_degrees : "+angle_as_map_degrees );

		// try the function versoin of this : 
		console.log( "--- get max angle to next point, given max dist inkm and laty, as function : "+this.get__max_degree_angle_to_next_point__given_max_distance_in_km_and_laty( given_distance_needed, given_latY_angle )) ;

		// -- test distance finding 
		// amke some poins
		var point_A = { "lat_angle_in_radians" : 0, "lat_angle_as_coord_sys_degrees" : 100, "lon_angle_in_radians" : 0, "long_angle_as_coord_sys_degrees" : 100 };

		var point_B = { "lat_angle_in_radians" : 0, "lat_angle_as_coord_sys_degrees" : 90, "lon_angle_in_radians" : 0, "long_angle_as_coord_sys_degrees" : 90 };

		var distance_btw_pointA_and_pointB = this.get__distance_to_other_point__in_settings_obj_points_format( point_A, point_B );
		console.log(" \t --- distance_btw_pointA_and_pointB : "+distance_btw_pointA_and_pointB );

		console.log("--- as above, but different input : "+this.get__distance_to_other_point__in_settings_obj_points_format__longwinded_input( 100, 90, 100, 90 ) );

	}


	// --- make new settings + data object? 

	this.make_new_TEST_settings_n_data_obj__with_global_subdivision = function(){
		console.log(">>>> make_new_TEST_settings_n_data_obj__with_global_subdivision() ");

		this.settings_n_data_objects_array.push( new this.settings_and_data_obj( this ) );

		var len_of_settings_array =  this.settings_n_data_objects_array.length;

		this.settings_n_data_objects_array[ len_of_settings_array-1 ].set_using_global_subdivision();

		//// make points! 

		this.generate_grid_points_for_given_settings_object( this.settings_n_data_objects_array[ len_of_settings_array-1 ] );
	}

	// ----- GEOMETRY CALCULATIONS! 

	this.generate_grid_points_for_given_settings_object = function( given_settings_obj ){
		console.log(">>>> generate_grid_points_for_given_settings_object() ");

		// the rather lengthy startup feedback! … ?!
		console.log("\t--- generating points for settings : \n\t\t grid layout mode : |"+given_settings_obj.what_kind_of_points_layout+"| \n\t\t grid size lat/lon "+given_settings_obj.points__global_subdivision__gridsize_latitude_x__in_km+"/"+given_settings_obj.points__global_subdivision__gridsize_longitude_y__in_km+" \n\t\t geo limits : for global layout : lat  "+given_settings_obj.geo_limits__global__left_latitude_limit__as_decimal__from_left_to_right+"/"+given_settings_obj.geo_limits__global__right_latitude_limit__as_decimal__from_left_to_right+" | long :  "+given_settings_obj.geo_limits__global__top_longitude_limit__as_decimal__from_top_to_bottom+"/"+given_settings_obj.geo_limits__global__bottom_longitude_limit__as_decimal__from_top_to_bottom+"  \n\t\t \n\t\t and gridsize in pixels : "+given_settings_obj.points__screen_subdivision__gridsize_horizontal_x__in_px+"/"+given_settings_obj.points__screen_subdivision__gridsize_vertical_y__in_px+" \n\t\t geo limits for screen grid layout : horisontal  "+given_settings_obj.geo_limits__global__left_latitude_limit__as_pixels__from_left_to_right_x+"/"+given_settings_obj.geo_limits__global__right_latitude_limit__as_pixels__from_left_to_right_x+" | vertical  "+given_settings_obj.geo_limits__global__left_longitude_limit__as_pixels__from_top_to_bottom_y+"/"+given_settings_obj.geo_limits__global__right_longitude_limit__as_pixels__from_top_to_bottom_y );

		// ------- local variables 

		var grid_points_LOCAL_VAR = []; 



		// -------- make points 

		// --- what kind of points - global or screen coords? 

		if( given_settings_obj.what_kind_of_points_layout == given_settings_obj.what_kind_of_points_layout__preset__global_subdivision ){							

			// --- get vertical angle steplength, for given vertical gridsize 

			var curr_vertical_angle_steplength_given_vertical_steplength__as_decimal_of_half_circle = this.get_longitude_angle_stepsize__as_decimal_of_half_circle__for_given_grid_stepsise_of_curr_setings_obj( given_settings_obj );

			console.log( " -- got a vertical angle step length of "+curr_vertical_angle_steplength_given_vertical_steplength__as_decimal_of_half_circle );

			// --- loop and fetch some nice coordinates :) 

			// - loop vertical y ( going bottom to top, due to funny geometry angle things… 
			//    ( angle 0 is on the horisontal ))
			// for( var curr_lon = given_settings_obj.geo_limits__global__bottom_longitude_limit__as_decimal__from_top_to_bottom ; curr_lon < given_settings_obj.geo_limits__global__top_longitude_limit__as_decimal__from_top_to_bottom; curr_lon += curr_vertical_angle_steplength_given_vertical_steplength__as_decimal_of_half_circle ){
			for( var curr_lon__in_radians = given_settings_obj.geo_limits__global__top_longitude_limit__as_decimal__from_top_to_bottom ; curr_lon__in_radians < given_settings_obj.geo_limits__global__bottom_longitude_limit__as_decimal__from_top_to_bottom; curr_lon__in_radians += curr_vertical_angle_steplength_given_vertical_steplength__as_decimal_of_half_circle ){

					// feedback 
					// console.log("\n ---- points gen loop : \n\t curr lat decimal : "+curr_lon__in_radians );

					// get circumference at this angle 
					var curr_circumference__in_km__at_this_decimal_half_circle_angle = this.get__curr_circumference__in_km__at_this_decimal_half_circle_angle( curr_lon__in_radians );

					// console.log(" ---- ---- curr Circumference : "+curr_circumference__in_km__at_this_decimal_half_circle_angle );

					// get decimal steplength 
					var curr_horisontal_steplength_as_decimal_of_circle_given_curr_circumference_and_desired_horisontal_stepsize_in_km = this.get__curr_horisontalLatitude_stepsize__as_decimal__of_full_circle__given_horisontal_stepsize_in_km__and__given_circumference_in_km( curr_circumference__in_km__at_this_decimal_half_circle_angle, given_settings_obj );

					// console.log(" --- --- curr horisontal stepsize as decimal of circle : "+curr_horisontal_steplength_as_decimal_of_circle_given_curr_circumference_and_desired_horisontal_stepsize_in_km );
					
					// -- loop horizontal - latitiude :) 
					for( var curr_lat__in_radians = given_settings_obj.geo_limits__global__left_latitude_limit__as_decimal__from_left_to_right ; curr_lat__in_radians < given_settings_obj.geo_limits__global__right_latitude_limit__as_decimal__from_left_to_right; curr_lat__in_radians += curr_horisontal_steplength_as_decimal_of_circle_given_curr_circumference_and_desired_horisontal_stepsize_in_km ){


						// console.log(" --- ---- --- now adding angle |"+curr_lat__in_radians+"| ");
						/*
							to do : 
								- get final position …
								( - convert to lat/lon? <-- needed to plot on leaflet! 
								- add to positions array …  ) 								
						*/

						// get current position as an angle 
						//////// var curr_lat__in_radians_as_angle__in_radians = curr_lat__in_radians; 

						// convert to lat/lon? 

						var curr_lat_as_coord_sys_angle = this.get__bounded_coord_system_LAT_coord_from_decimal_coord_value( curr_lat__in_radians );

						var curr_LON_as_coord_sys_angle = this.get__bounded_coord_system_LONG_coord_from_decimal_coord_value( curr_lon__in_radians );


						// ------------  SAVE POSTITIONS ------------

						var curr_out_coords_set = { "lat_angle_in_radians" : curr_lat__in_radians, "lat_angle_as_coord_sys_degrees" : curr_lat_as_coord_sys_angle, "lon_angle_in_radians" : curr_lon__in_radians, "long_angle_as_coord_sys_degrees" : curr_LON_as_coord_sys_angle }

					/*
						// destinations! 
						given_settings_obj.latitide_division__latitude_subdivision_angles_in_radians = [];
						given_settings_obj.longitude_division__longitude_subdivision_angles_in_radians = [];
						given_settings_obj.latitude_and_longitude_positions = [];
					*/

						// save coordinate to the general out-box… 
						given_settings_obj.latitude_and_longitude_positions.push( curr_out_coords_set );


					} 

			}

		} // end if global layout grid points calculation 

	}


	// ---- get the latitude angle stepsize, in radian, given the latitude gridsize 

	this.get_longitude_angle_stepsize__as_decimal_of_half_circle__for_given_grid_stepsise_of_curr_setings_obj = function( given_settings_obj ){
		console.log(">>>> get_longitude_angle_stepsize__as_decimal_of_half_circle__for_given_grid_stepsise_of_curr_setings_obj() ");
		console.log(" --- earths_circumference__around_poles__in_km : "+this.HALF_earths_circumference__around_poles__in_km+" grid step length along longitude : "+given_settings_obj.points__global_subdivision__gridsize_longitude_y__in_km+" km" );

			return ( given_settings_obj.points__global_subdivision__gridsize_longitude_y__in_km/this.HALF_earths_circumference__around_poles__in_km ); 
	}


	// ---- get the circumference of the current latitue position, given the decimal of the half circle

	// convert degree angle to radians 
	this.get__radians_angle_from_map_degree_angle = function( angle_in_degrees ){

		return (( angle_in_degrees / 180 ) * Math.PI );
	}


	// get radius given latY angle 
	this.get__earth_radius_at_given_latY_angle_in_km = function( given_latY_angle ){

		return ( Math.cos( given_latY_angle ) * this.earth_radius );
	}


	// get circumferance given radius 
	this.get__earth_circumferance_given_radius__in_km = function( earth_radius_at_laty ){

		return ( 2*Math.PI * earth_radius_at_laty );
	}


	// get decimal angle, at given circumferance, needed to get given km distance 
	this.get__angle_in_decimals_of_full_circle__needed_to_produce_given_distance__at_given_circumferance = function( given_circumferance, given_distance ){

		return ( given_distance / given_circumferance );
	}

	// convert angle, from decimal of full circule, to degree angle 
	this.get__angle_as_coordinates_of_map__given_angle_as_decimal_of_full_circle = function( angle_as_decimal_of_full_circle ){

		return ( angle_as_decimal_of_full_circle * 360 );
	}


	this.get__curr_circumference__in_km__at_this_decimal_half_circle_angle = function( curr_lon_as_decimal_of_half_circle ){
		// console.log(">>>> get__curr_circumference__in_km__at_this_decimal_half_circle_angle - curr lat : |"+curr_lon_as_decimal_of_half_circle+"|" );

		// 20190816 - TESTING doing + 1/2 PI rather than - 1/2 PI. 
		// 				- so rather than the angle beginning at the south pole, it begins at the north pole.
		// var curr_angle_in_radians = ( Math.PI * curr_lon_as_decimal_of_half_circle ) - this.half_pi ;
		var curr_angle_in_radians = ( Math.PI * curr_lon_as_decimal_of_half_circle ) + this.half_pi ;

		var curr_radius = Math.abs( Math.cos( curr_angle_in_radians ) * this.earth_radius ) ;

		var curr_circumference_at_this_latitude = 2*Math.PI*curr_radius;

		return curr_circumference_at_this_latitude;

	}	


	this.get__distance_to_other_point__in_settings_obj_points_format = function( point_A, point_B ){

		var dx = point_A['long_angle_as_coord_sys_degrees'] - point_B['long_angle_as_coord_sys_degrees']; 
		var dy = point_A['lat_angle_as_coord_sys_degrees'] - point_B['lat_angle_as_coord_sys_degrees'];

		return Math.sqrt( ( dx*dx )  + ( dy*dy ) );
	}

	this.get__distance_to_other_point__in_settings_obj_points_format__longwinded_input = function( point_A__laty, point_B__laty, point_A__longx, point_B__longx ){

		var dx = point_A__laty - point_B__laty; 
		var dy = point_A__longx - point_B__longx;

		return Math.sqrt( ( dx*dx )  + ( dy*dy ) );
	}



	// do the whole works - get laty and km distance to next point and return 
	// the max degree angle to the next point ( ie equivalent of the km distance )

	this.get__max_degree_angle_to_next_point__given_max_distance_in_km_and_laty = function( max_distance_in_km, given_laty ){

		console.log(">>>> get__max_degree_angle_to_next_point__given_max_distance_in_km_and_laty - got distance |"+max_distance_in_km+"| and laty : |"+given_laty+"|" );

		var curr_angle_in_radians = this.get__radians_angle_from_map_degree_angle( given_laty );

		var radius_at_given_latY_angle = this.get__earth_radius_at_given_latY_angle_in_km( curr_angle_in_radians );

		var circumferance_at_that_angle = this.get__earth_circumferance_given_radius__in_km( radius_at_given_latY_angle );

		var angle_for_needed_distance__as_decimal_of_full_circle = this.get__angle_in_decimals_of_full_circle__needed_to_produce_given_distance__at_given_circumferance( circumferance_at_that_angle, max_distance_in_km );

		return this.get__angle_as_coordinates_of_map__given_angle_as_decimal_of_full_circle( angle_for_needed_distance__as_decimal_of_full_circle );
	}

	// ---- get latitude ( ie horisontal/x ) steplength for current horisontal stepsize as decimal of circle

	this.get__curr_horisontalLatitude_stepsize__as_decimal__of_full_circle__given_horisontal_stepsize_in_km__and__given_circumference_in_km = function( curr_circumference_in_km, given_settings_obj ){
		// console.log( ">>>> get__curr_horisontalLatitude_stepsize__as_decimal__of_full_circle__given_horisontal_stepsize_in_km__and__given_circumference_in_km() - curr_circumference_in_km : "+curr_circumference_in_km );

		return ( given_settings_obj.points__global_subdivision__gridsize_latitude_x__in_km / curr_circumference_in_km );
	}


	// ---- degree conversion, etc…

	// decimal value to unbounded decimal LAT angle 
	this.get__bounded_coord_system_LAT_coord_from_decimal_coord_value = function( in_angle ){

		var out_angle = in_angle;
		out_angle = this.get__unbounded_lat_degree_angle__given_decimal_circle_value( out_angle );

		return this.get__coordinate_system_lat_angle__given__360deg_lat_angle( out_angle );
	}

	// decimal value to unbounded decimal LONG angle 
	this.get__bounded_coord_system_LONG_coord_from_decimal_coord_value = function( in_angle ){

		var out_angle = in_angle;
		out_angle = this.get__unbounded_long_degree_angle__given_decimal_half_circle_value( out_angle );

		return this.get__coordinate_system_long_angle__given__180deg_long_angle( out_angle );
	}



	// - LAT decimal to 360° angle ( conversion to regular coordinate systems angle lat )
	this.get__unbounded_lat_degree_angle__given_decimal_circle_value = function( in_angle_as_decimal ){

		return 360 * in_angle_as_decimal ;
	}

	// - LONG decimal to 180° angle ( conversion to regular coordinate systems angle long )
	this.get__unbounded_long_degree_angle__given_decimal_half_circle_value = function( in_angle_as_decimal ){

		return 180 * in_angle_as_decimal ;
	}

	// - unbounded latitude angle ( 0->360° ) to regular coords sys LATITUDE angle ( -180° <-> 180° )
	this.get__coordinate_system_lat_angle__given__360deg_lat_angle = function( in_angle ){

		var out_angle = in_angle % 360;

		if( out_angle > 180 ){
			out_angle = -180 + ( out_angle % 180 );
		}

		return out_angle;
	}

	// - unbounded LONGITUDE angle ( 0-180°)  to regular coord sys angle ( -90° <-> 90° )
	this.get__coordinate_system_long_angle__given__180deg_long_angle = function( in_angle ){

		var out_angle = in_angle % 180;

		if( out_angle <= 90 ){
			out_angle = 90 - in_angle;
		}else if( in_angle > 90 ){
			out_angle = -1*( in_angle % 90 );
		}

		return out_angle;
	}



	// ------ import sensor location data from the main object

	this.get__given_day_sensor_data_from_main_object__as_settings_obj_coords = function( day_to_fetch__TODAY_is_valid__also_YY_MM_DD_string ){

		console.log(">>>> get__given_day_sensor_data_from_main_object__as_settings_obj_coords() - fetch data from days_data_holder variable, of day >> |"+day_to_fetch__TODAY_is_valid__also_YY_MM_DD_string+"|" );

		// - for timing 
		var starttime = new Date();

		// ----- which is the relevant day data indx 
		var days_data_holder__day_index__as__YY_MM_DD_string = day_to_fetch__TODAY_is_valid__also_YY_MM_DD_string;

		// correct if neccessary 
		if( days_data_holder__day_index__as__YY_MM_DD_string == "today" || days_data_holder__day_index__as__YY_MM_DD_string == "TODAY" ){

			days_data_holder__day_index__as__YY_MM_DD_string = current_dateTime__as_YY_MM_DD_string;
		}
		// feedback 
		console.log("--- the current days_data_holder index is : |"+days_data_holder__day_index__as__YY_MM_DD_string+"|" );


		// ----- make new settings object

		this.settings_n_data_objects_array.push( new this.settings_and_data_obj( this ) );

		var our_obj_array_index =  this.settings_n_data_objects_array.length -1;

		console.log("--- our_obj_array_index : "+our_obj_array_index );


		// --- set the settings in the settings object
			// - don't forget to identify it as a snesor loc object 

		this.settings_n_data_objects_array[ our_obj_array_index ].current__what_kind_of_geometry_object = this.settings_n_data_objects_array[ our_obj_array_index ].what_kind_of_geometry_object__sensor_location_object;

		// set what date the data is from 
		this.settings_n_data_objects_array[ our_obj_array_index ].as_sensor_loc_object__data_date_as_YY_MM_DD_string = days_data_holder__day_index__as__YY_MM_DD_string;


		// --- insert the coords of the given day, into the settings object 

		var curr_day_data_holder_sensor__sensor_count = days_data_holder[ days_data_holder__day_index__as__YY_MM_DD_string ]['lat_lon'].length; 

		for( var curr_day_data_holder_day_sensor = 0; curr_day_data_holder_day_sensor < curr_day_data_holder_sensor__sensor_count; curr_day_data_holder_day_sensor++ ){

			// ----- make new coordinate object, with the addition of the sensor id?  

			// store variables here, for a momment 
			var curr_sensor__lat =  days_data_holder[ days_data_holder__day_index__as__YY_MM_DD_string ]['lat_lon'][curr_day_data_holder_day_sensor][0];
			var curr_sensor__long =  days_data_holder[ days_data_holder__day_index__as__YY_MM_DD_string ]['lat_lon'][curr_day_data_holder_day_sensor][1];
			// sensor id 
			var curr_sensor__sensor_id =  days_data_holder[ days_data_holder__day_index__as__YY_MM_DD_string ]['sensor_ids'][curr_day_data_holder_day_sensor];

			// the compiled associative array for this coord
			var curr_out_coords_set = { "lat_angle_as_coord_sys_degrees" : curr_sensor__lat, "long_angle_as_coord_sys_degrees" : curr_sensor__long, "sensor_id" : curr_sensor__sensor_id };

			// ---- add it to the settings object coords array 
			this.settings_n_data_objects_array[ our_obj_array_index ].latitude_and_longitude_positions.push( curr_out_coords_set );
		}

		// 
		//
		console.log("---- ----- so all that took "+( new Date() - starttime )+" ms" );

	}



	// ---- find points in one settings grid obj that are near points in another settings grid obj

	this.get__points_in_one_settings_obj_that_are_near_points_in_another_settings_obj = function( settings_obj__with_points_to_keep, settings_obj__which_points_one_compares_with, max_dist_to_other_point__in_km_ ){

		console.log("get__points_in_one_settings_obj_that_are_near_points_in_another_settings_obj() - with a max distance of "+max_dist_to_other_point__in_km_+" km to other points ");

		// - more feedback? 


		// ------- variables

		var out_points = [];

		// locallise the values …  for speed 
		var max_dist_to_other_point__in_km = max_dist_to_other_point__in_km_;
		var object_points_KEEP = settings_obj__with_points_to_keep;
		var object_points_COMPARE = settings_obj__which_points_one_compares_with;


		console.log( "\t --- settings_obj__with_points_to_keep : ");
		console.log( object_points_KEEP );
		console.log( "\t --- settings_obj__with_points_to_keep.latitude_and_longitude_positions : ")
		console.log( object_points_KEEP.latitude_and_longitude_positions );

		// - how many degrees is the given max distance to another point, at the given ( key : ) latitude 
		// 		- ie : key : lattitude | value : max distance to a point, in degrees
		var lookup_array__max_distance_in_degrees_to_next_point_at_given_lat = {};

		// loop through the object which points we want to keep 
		// for( var obj_pts_KEEP_i = 0; obj_pts_KEEP_i < object_points_KEEP.latitude_and_longitude_positions.length; obj_pts_KEEP_i++ ){
		// NOET NOTE NOTE : limiting to 10 points comparison 
		for( var obj_pts_KEEP_i = 0; obj_pts_KEEP_i < 10; obj_pts_KEEP_i++ ){

			console.log("\t\t --- working on keep point # "+obj_pts_KEEP_i+", which looks like this ");
			console.log( object_points_KEEP.latitude_and_longitude_positions[ obj_pts_KEEP_i ] );

			// -- check if exists / get the max degrees distance to a valid near point, at this latitude 

			// localise lat/long
			var curr_lat =  object_points_KEEP.latitude_and_longitude_positions[ obj_pts_KEEP_i ]['lat_angle_as_coord_sys_degrees'];
			var curr_long = object_points_KEEP.latitude_and_longitude_positions[ obj_pts_KEEP_i ]['long_angle_as_coord_sys_degrees'];
			
			// for lookup operations : 
			var curr_lat_as_string = String( curr_lat );

			// initialise max distance variable 
			var curr_max_degree_distance_to_other_point = 1000000;

			// check if the relevant max distance to another point
			//		is already in the lookup table 
			if( curr_lat_as_string in lookup_array__max_distance_in_degrees_to_next_point_at_given_lat ){
				console.log("--- yes! the current lat ("+curr_lat_as_string+") is in the lookup table ");

				// yes! the distance is in the lookup table
				// - let's use it! 
				curr_max_degree_distance_to_other_point = lookup_array__max_distance_in_degrees_to_next_point_at_given_lat[ curr_lat_as_string ];
			}
			else{
				// if the distance is not in the lookup table, 
				//		generate it and add it to the lookup table

				curr_max_degree_distance_to_other_point = this.get__max_degree_angle_to_next_point__given_max_distance_in_km_and_laty( max_dist_to_other_point__in_km, curr_lat );

				// store the point the lookup table too! 
				lookup_array__max_distance_in_degrees_to_next_point_at_given_lat[ curr_lat_as_string ] = curr_max_degree_distance_to_other_point;
			}


			console.log("\t --- curr_max_degree_distance_to_other_point : "+curr_max_degree_distance_to_other_point+" - at this latitude ("+curr_lat+")" );
			// --- loop through the points in the other (comparison) array 
			// // // 
			// // // loop loop loop
			// // // 

			// for( var obj_pts__COMPARE_i = 0; obj_pts__COMPARE_i < object_points_COMPARE.latitude_and_longitude_positions.length; object_points_COMPARE++  ){
			// NOTE 
			// NOTE : LIMITED NUMBEr OF POINTs! 
			// NOTE 
			for( var obj_pts__COMPARE_i = 0; obj_pts__COMPARE_i < 10; obj_pts__COMPARE_i++  ){

				console.log("\t\t - working on pt # "+obj_pts__COMPARE_i );

				// localise
				var comparison_pt_laty = object_points_COMPARE.latitude_and_longitude_positions[ obj_pts__COMPARE_i ]['lat_angle_as_coord_sys_degrees'];
				var comparison_pt_longx = object_points_COMPARE.latitude_and_longitude_positions[ obj_pts__COMPARE_i ]['long_angle_as_coord_sys_degrees'];

				var dist_btw_pts = this.get__distance_to_other_point__in_settings_obj_points_format__longwinded_input( curr_lat, comparison_pt_laty, curr_long, comparison_pt_longx );

				console.log("\t\t --- point A lat/long : "+curr_lat+", "+curr_long );
				console.log("\t\t --- point B lat/long : "+comparison_pt_laty+", "+comparison_pt_longx );
				console.log("\t\t ---- dist btw pts : "+dist_btw_pts );

			}



				//  get dx/dy
				//  get diagonal distance 
				//  check if distance is smaller than max distance 
				// IF SMALLER THAN MAX DISTANCE :
					// save point in keep array 
					// break ( we don't need to check any more points, as we've found that the given keep point is witin distance of a sensor )



		}

		// ------ set up new settings object and save the points there 
	}



	// ----- drawing! ----

	/* 
		this function could be mad emore complex later, eg with notes about 
		which coordinates it should draw, etc… 
			- could be some on/off switches as to which coords it should draw. 

	*/

	this.simple_drawing_function___coords_gen_obj = function( canvas_context, main_this, local_this, draw_layer_this, info ){
		console.log(">>>> simple_drawing_function___coords_gen_obj() ");

		var starttime = new Date();
/*
        canvas_context.strokeStyle = "red";
        canvas_context.beginPath();
        canvas_context.moveTo(0, 0);
        canvas_context.lineTo(1000, 1000);
        canvas_context.lineTo(0, 1000);
        canvas_context.lineTo(1000, 0);
        canvas_context.stroke(); 
*/
        //// and then try plotting some coordinate points :) 

        console.log( "--- draw_layer_this.settings_n_data_objects_array.length : "+draw_layer_this.settings_n_data_objects_array.length );
        console.log( "--- draw_layer_this.settings_n_data_objects_array[0].latitude_and_longitude_positions.length : "+draw_layer_this.settings_n_data_objects_array[0].latitude_and_longitude_positions.length );
        console.log( "--- draw_layer_this.settings_n_data_objects_array[0].latitude_and_longitude_positions[0] : "+draw_layer_this.settings_n_data_objects_array[0].latitude_and_longitude_positions[0] );
        console.log( "--- draw_layer_this.settings_n_data_objects_array[0].latitude_and_longitude_positions[1] lat/long degrees : "+draw_layer_this.settings_n_data_objects_array[0].latitude_and_longitude_positions[1]['lat_angle_as_coord_sys_degrees']+"/"+draw_layer_this.settings_n_data_objects_array[0].latitude_and_longitude_positions[1]['long_angle_as_coord_sys_degrees'] );

        // set fill colour 
        canvas_context.fillStyle = draw_layer_this.settings_n_data_objects_array[0].coords_point__fill_colour;
        //// canvas_context.fillStyle = "red";
        // - copy values locally 
        var coords_point_width = draw_layer_this.settings_n_data_objects_array[0].coords_point__width_px_x;
        var coords_point_height = draw_layer_this.settings_n_data_objects_array[0].coords_point__height_px_y;

        // or… 
        // var pixel_size_given_zoom_level = ( 1** ( ( map.getZoom() - 2 )/120 ) )+2 ;

        // loop and draw
        // for( var curr_pt_i = 0; curr_pt_i < draw_layer_this.settings_n_data_objects_array[0].latitude_and_longitude_positions.length; curr_pt_i++ ){
    	// NOTE THE SMALLER AMOUNT OF POINTS ( thanks to the += 1000 hop )
    	for( var curr_pt_i = 0; curr_pt_i < draw_layer_this.settings_n_data_objects_array[0].latitude_and_longitude_positions.length; curr_pt_i += 1 ){

    		// console.log("\n --- simple_drawing_function___coords_gen_obj : working on point # "+curr_pt_i );

        	var curr_lat = draw_layer_this.settings_n_data_objects_array[0].latitude_and_longitude_positions[curr_pt_i]['lat_angle_as_coord_sys_degrees'];
        	var curr_long = draw_layer_this.settings_n_data_objects_array[0].latitude_and_longitude_positions[curr_pt_i]['long_angle_as_coord_sys_degrees'];

        	// var dot_loc = info.layer._map.latLngToContainerPoint( [ curr_lat, curr_long ] );
        	var dot_loc = info.layer._map.latLngToContainerPoint( [ curr_long, curr_lat ] );

        	// console.log("\t --- curr position : (coords/px) "+curr_lat+","+curr_long+" / "+dot_loc.x+","+dot_loc.y );

			canvas_context.fillRect( dot_loc.x, dot_loc.y, coords_point_width, coords_point_height );
			// canvas_context.fillRect( dot_loc.x, dot_loc.y, pixel_size_given_zoom_level, pixel_size_given_zoom_level );
        }


        console.log("--- simple_drawing_function___coords_gen_obj - drawing loop took |"+( new Date() - starttime )+"| ms ");

	}



	// --------------  objects

	// settings and daata holder for various calculations
	this.settings_and_data_obj = function( super_ ){


		// ------- paramaters

		this.super = super_;


		// ------ some geometry

		this.latitide_division__latitude_subdivision_angles_in_radians = [];
		this.longitude_division__longitude_subdivision_angles_in_radians = [];
		this.latitude_and_longitude_positions = [];

		// ------ settings 
	

		// --- free text description of object 

		this.free_text_description_of_object = "This is where one might describe the object";

		// for when it's a sensor location obejct
		this.as_sensor_loc_object__data_date_as_YY_MM_DD_string = -1;
		

		// --- what kind of geometry object
		//			- HINT : can be good for separatng out intersections
		//					 and generated coords, later. 

		// presets
		this.what_kind_of_geometry_object__generated_coords_object = "what_kind_of_object__generated_coords_object";
		this.what_kind_of_geometry_object__sensor_location_object = "what_kind_of_geometry_object__sensor_location_object";
		this.what_kind_of_geometry_object__intersection_coords_object = "what_kind_of_object__intersection_coords_object";
		// actual setting 
		this.current__what_kind_of_geometry_object = this.what_kind_of_geometry_object__generated_coords_object;


		// --- what kind of points layout? 

		this.what_kind_of_points_layout__preset__global_subdivision = "what_kind_of_points_layout__preset__global_subdivision";

		this.what_kind_of_points_layout__preset__screen_subdivision = "what_kind_of_points_layout__preset__screen_subdivision";

		// finally 
		this.what_kind_of_points_layout = this.what_kind_of_points_layout__preset__global_subdivision ;


		// --- points gridsize? 

		this.points__global_subdivision__gridsize_latitude_x__in_km = 25;
		this.points__global_subdivision__gridsize_longitude_y__in_km = 25;

		this.points__screen_subdivision__gridsize_horizontal_x__in_px = 50;
		this.points__screen_subdivision__gridsize_vertical_y__in_px = 50;



		// --- geo-limits 

		// -- for global subdivision 

		// latitude x  
		this.geo_limits__global__left_latitude_limit__as_decimal__from_left_to_right = 0;
		this.geo_limits__global__right_latitude_limit__as_decimal__from_left_to_right = 1;


		//  longitude y 
		this.geo_limits__global__top_longitude_limit__as_decimal__from_top_to_bottom = 0.0;
		this.geo_limits__global__bottom_longitude_limit__as_decimal__from_top_to_bottom = 1;


		// -- for screen subdivision 

		// latitude x  
		this.geo_limits__global__left_latitude_limit__as_pixels__from_left_to_right_x = 0;
		this.geo_limits__global__right_latitude_limit__as_pixels__from_left_to_right_x = 1;


		//  longitude y 
		this.geo_limits__global__left_longitude_limit__as_pixels__from_top_to_bottom_y = 0;
		this.geo_limits__global__right_longitude_limit__as_pixels__from_top_to_bottom_y = 1;



		// --------- DATA

		/* 
		Should this be multidimensional, with an array per row?  … let's start by keeping it simple; )	
		*/

		this.grid_points__out = [];


		// --------- VISUAL APPEARANCE

		this.coords_point__width_px_x = 2;
		this.coords_point__height_px_y = 2;

		this.coords_point__fill_colour = "rgba( 0, 0, 255, 0.75 )";




		// --------- methods 


		// -- set the kind of grid construction we're looking at 

		this.set_using_global_subdivision = function(){

			console.log(">>>> set_using_global_subdivision() ");

			this.what_kind_of_points_layout = this.what_kind_of_points_layout__preset__global_subdivision ;			
		}

		// and the other 
		this.set_using_screen_subdivision = function(){

			console.log(">>>> set_using_screen_subdivision() ");

			this.what_kind_of_points_layout = this.what_kind_of_points_layout__preset__screen_subdivision ;			
		}

		// feedback
		this.feedback__what_kind_of_subdivision_are_we_using = function(){
			console.log(">>>> feedback__what_kind_of_subdivision_are_we_using() : this.what_kind_of_points_layout : |"+this.what_kind_of_points_layout+"|" );

		}


	}



	// --------------  constructor

	this.print_input();	

	// // TEST 
	// this.make_new_TEST_settings_n_data_obj__with_global_subdivision();

}