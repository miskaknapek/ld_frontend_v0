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

	// --- urls and paths

	// and AS ABOVE BUT ON A REMOTE SERVER 
	this.path_to_sensor_grid_and_surrounding_grids_coords_out_file = "/mnt/virtio-bbc6cf3a-042b-4410-9/luftdaten/luftdaten_code/humidity_correction/sensor_grid_creation/humdiity_grids_data/sensor_grid_and_surrounding_grids_coords.json";

	// LOCAL SERVER ADDRESS!
	// save the sensor + low res grid points here 
	this.path_to_sensor_grid_and_surrounding_grids_coords_out_file = "/mnt/virtio-bbc6cf3a-042b-4410-9/luftdaten/luftdaten_daten/humidity_correction_data/humidity_correction__generated_coords/sensor_grid_and_surrounding_grids_coords.json";


	// fetch them from there 
	this.url_to_external_sensor_grid_and_surrounding_low_res_grid_INPUT_file = "http://sourisr.kapsi.fi/luftdaten/luftDaten_data_explorations/ld_daten_various/generated_coords/sensor_grid_and_surrounding_grids_coords.json";


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

	// --- setings objects to draw?! 
	this.rendering__indicies_of_settings_objects_to_draw__as_array = [0];


	// --------------  methods TEST methods TEST

	this.print_input = function(){
		console.log(">>> print_input something : |"+this.input+"|" );
	}

	this.print_input_EXTERNAL = function(){
		console.log(">>> print_input_EXTERNAL() something : |"+this.input+"|" );
	}


	// TEST - make basic settings objects, save coordinates to external file 

	this.TEST__make_settings_objects__save_to_external_file__PART_ONE_of_two = function(){
		console.log(">>>> TEST__make_settings_objects__save_to_external_file__PART_ONE_of_two() ");


		// --- initialisation 

		// var main_sensor_locs_output_directory_path = "/mnt/virtio-bbc6cf3a-042b-4410-9/luftdaten/luftdaten_code/humidity_correction/sensor_grid_creation/humdiity_grids_data";

		var out_url__sensor_coords = "TEST__make_settings_objects__save_to_external_file__SENSOR_COORDS_OUTPUT.json";

		var out_url__low_res_grid_coords = "TEST__make_settings_objects__save_to_external_file__LOW_RES_GRID_OUTPUT.json";


		// --- --- RUN 

		// --- make high res grid which will intersect with sensors 

		this.settings_n_data_objects_array.push( new this.settings_and_data_obj( this ) );

		var curr_settings_obj_i = this.settings_n_data_objects_array.length -1;

		// set grid spacing 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].points__global_subdivision__gridsize_latitude_y__in_km = 50;
		this.settings_n_data_objects_array[ curr_settings_obj_i ].points__global_subdivision__gridsize_longitude_x__in_km = 50;

		// set grid extent 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].geo_limits__global__top_latitude_limit__as_decimal__from_top_to_bottom = 0.1;
		this.settings_n_data_objects_array[ curr_settings_obj_i ].geo_limits__global__bottom_latitude_limit__as_decimal__from_top_to_bottom = 0.81;

		// set the visual grid point size 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__width_px_x = 8;
		this.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__height_px_y = 8;

		// set object colour 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__fill_colour = "rgba( 255, 0, 0, 0.5 )";

		// describe it a bit better 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].free_text_description_of_object = "hgher res grid for intersecting with sensor locations with … ";

		// generate poins according to settings 
		this.generate_grid_points_for_given_settings_object( this.settings_n_data_objects_array[ curr_settings_obj_i ] );


		// ---- make lower resolution grid which will intersect with sensor grid

		this.settings_n_data_objects_array.push( new this.settings_and_data_obj( this ) );

		var curr_settings_obj_i = this.settings_n_data_objects_array.length -1;

		// set grid spacing 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].points__global_subdivision__gridsize_latitude_y__in_km = 350;
		this.settings_n_data_objects_array[ curr_settings_obj_i ].points__global_subdivision__gridsize_longitude_x__in_km = 350;

		// set grid extent 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].geo_limits__global__top_latitude_limit__as_decimal__from_top_to_bottom = 0.1;
		this.settings_n_data_objects_array[ curr_settings_obj_i ].geo_limits__global__bottom_latitude_limit__as_decimal__from_top_to_bottom = 0.81;

		// set the visual grid point size 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__width_px_x = 8;
		this.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__height_px_y = 8;

		// set object colour 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__fill_colour = "rgba( 255, 0, 0, 0.5 )";

		// describe it a bit better 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].free_text_description_of_object = "lowe res grid for intersecting with sensor locations with … avoiding sensors";

		// generate poins according to settings 
		this.generate_grid_points_for_given_settings_object( this.settings_n_data_objects_array[ curr_settings_obj_i ] );


		// ---- make settings object with sensor coords


		this.settings_n_data_objects_array.push( new this.settings_and_data_obj( this ) );

		var curr_settings_obj_i = this.settings_n_data_objects_array.length -1;

		// set grid spacing 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].points__global_subdivision__gridsize_latitude_y__in_km = -1;
		this.settings_n_data_objects_array[ curr_settings_obj_i ].points__global_subdivision__gridsize_longitude_x__in_km = -1;

		// set grid extent 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].geo_limits__global__top_latitude_limit__as_decimal__from_top_to_bottom = 0.1;
		this.settings_n_data_objects_array[ curr_settings_obj_i ].geo_limits__global__bottom_latitude_limit__as_decimal__from_top_to_bottom = 0.81;

		// set the visual grid point size 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__width_px_x = 8;
		this.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__height_px_y = 8;

		// set object colour 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__fill_colour = "rgba( 255, 0, 0, 0.5 )";

		// describe it a bit better 
		this.settings_n_data_objects_array[ curr_settings_obj_i ].free_text_description_of_object = "settings object with sensor coords!";


		// --  fetch sensor coords - and later insert them into the relevant settings obj 

		this.retrieve_sensor_coords_from_online__YESTERDAY_AND_TODAYS_FILES__WITH_NODE( this );
		// THINGS CONTINUE AFTER THE ABOVE SCRIPT'S CALLBACK, in A DIFFERENT FUNCTION! 
		// THINGS CONTINUE AFTER THE ABOVE SCRIPT'S CALLBACK, in A DIFFERENT FUNCTION! 
		// THINGS CONTINUE AFTER THE ABOVE SCRIPT'S CALLBACK, in A DIFFERENT FUNCTION! 
		// THINGS CONTINUE AFTER THE ABOVE SCRIPT'S CALLBACK, in A DIFFERENT FUNCTION! 
		//
		// EG here : TEST__make_settings_objects__save_to_external_file__PART_TWO_of_TWO
		// EG here : TEST__make_settings_objects__save_to_external_file__PART_TWO_of_TWO
		// EG here : TEST__make_settings_objects__save_to_external_file__PART_TWO_of_TWO

	}


	this.TEST__make_settings_objects__save_to_external_file__PART_TWO_of_TWO = function( local_root  ){

		console.log(">>>> TEST__make_settings_objects__save_to_external_file__PART_TWO_of_TWO() - got YESTERDAY and TODAY files with data of length "+local_root.TODAYS_historic_luftdaten['lat_lon'].length+" / "+local_root.YESTERDAY_historic_luftdaten['lat_lon'].length );

		var local_root = local_root;

		var starttime = new Date();

		// -------- complete sensor settings obj things : add sensor locations to given settings obj 

		// get unique sensor locations coords 
		local_root.get_unique_sensor_locs_from_yesterdays_and_todays_sensor_data_files( local_root );

		// convert received coordinates 

		// TEMPORARY LOCAL VARIABLE ASSIGNMENT! 
		// TEMPORARY LOCAL VARIABLE ASSIGNMENT! 
		// TEMPORARY LOCAL VARIABLE ASSIGNMENT! 

		local_root.retrieved_coords_in_local_format = local_root.convert__lat_lon_tuple__to__setings_obj_latitude_and_longitude_positions_format( local_root.relevant_sensor_locs__in_lat_long_tuple_format );
		// TEMPORARY LOCAL VARIABLE ASSIGNMENT! 
		// TEMPORARY LOCAL VARIABLE ASSIGNMENT! 
		// TEMPORARY LOCAL VARIABLE ASSIGNMENT! 

		// get settings obj index 
		var settings_obj_with_sensor_coords_index = local_root.settings_n_data_objects_array.length -1;

		// add sensor coordinates to the settings object for sensor data … 
		local_root.settings_n_data_objects_array[ settings_obj_with_sensor_coords_index ].latitude_and_longitude_positions = local_root.retrieved_coords_in_local_format ;

		// ------- generate intersections with high res grid 

		// -- do an intersection calculation, of the [0] generated grid and the sensor poins
		// settings obj 0 : high res coords for 
		// settings obj 2 : sensor locs 
		// - output : settings obj 3 ?! 
		local_root.get__points_in_one_settings_obj_that_are_near_points_in_another_settings_obj__KEEP_the_first_array__if_overlap_with_COMPARE_array( local_root.settings_n_data_objects_array[0], local_root.settings_n_data_objects_array[2], 25 );

		console.log("\t --- just did intersections and we should now have 3 settings objects : checking : local_root.settings_n_data_objects_array.length : "+local_root.settings_n_data_objects_array.length  );

		// ------ generate non-intersections with low res grid ( settings obj 1 )

		local_root.get__points_in_one_settings_obj_that_are_NOT_near_points_in_another_settings_obj__KEEP_the_first_array__if_NO_NO_NO_overlap_with_COMPARE_array( local_root.settings_n_data_objects_array[1], local_root.settings_n_data_objects_array[3], 100 );


		console.log("\t --- just did NON-intersections and we should now have 4 settings objects : checking : local_root.settings_n_data_objects_array.length : "+local_root.settings_n_data_objects_array.length  );


		// give status of how many points are in each grid 
		local_root.print_num_of_coordinate_points_in_each_settings_obj()



		// ---- remember to conver the coordinates to a smaller format, before saving! 



		//  ---- gather points to export 

		// assign locally and make things a bit easier to comprehend :) 
		var sensor_grid_points = local_root.settings_n_data_objects_array[3];
		var surrouning_lower_res_grid = local_root.settings_n_data_objects_array[4];


		// --- make the format of the coords smaller, for easier export 

		// sensor grid points : convert the lat long points to a smaller format :) 
		sensor_grid_points.latitude_and_longitude_positions = local_root.convert__setings_obj_latitude_and_longitude_positions_format_array__to__lat_lon_tuple_array( sensor_grid_points.latitude_and_longitude_positions );

		// for surrounding grid points : convert the lat long points to a smaller format :) 
		surrouning_lower_res_grid.latitude_and_longitude_positions = local_root.convert__setings_obj_latitude_and_longitude_positions_format_array__to__lat_lon_tuple_array( surrouning_lower_res_grid.latitude_and_longitude_positions );


		// --- prepare for json export 

		var sensor_and_low_res_surrounding_grid_poins_to_export = { "higher_res_sensor_grid" : sensor_grid_points.latitude_and_longitude_positions, "lower_res_surrounding_grid" : surrouning_lower_res_grid.latitude_and_longitude_positions };

		var out_json_as_string = JSON.stringify( sensor_and_low_res_surrounding_grid_poins_to_export );

		console.log("\t --- converted json data obj to string and got json string of length "+out_json_as_string.length );

		// --- save as string

		// NOTE : THIS function hasn't been written yet… 
		// local_root.generate_out_filepath_for_coords_data_with_timestamp();

		local_root.write_text_file__with__given_text__and__url__with_node( out_json_as_string, local_root.path_to_sensor_grid_and_surrounding_grids_coords_out_file );


		// --- finnisemeng… 

		console.log("|||| part two / two of coords gen and saving, shoudl hopefully be done : in time "+(new Date() - starttime)+" ms ");

		// empty some variables

		local_root.retrieved_coords_in_local_format = -1;
	}




	// TEST - the intersection functionalities 
	this.intersection_testing01 = function(){
		console.log(">>>> intersection_testing01()");

		// -- copy today's sensor coords over into a settings object 
		this.get__given_day_sensor_data_from_main_object__as_settings_obj_coords( "today" );

		// -- do an intersection calculation, of the [0] generated grid and the sensor poins
		this.get__points_in_one_settings_obj_that_are_near_points_in_another_settings_obj__KEEP_the_first_array__if_overlap_with_COMPARE_array( calc_coords2.settings_n_data_objects_array[0], calc_coords2.settings_n_data_objects_array[1], 25 );

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


		// ---- test make new lower res setings object and calculate grid points 

		// make new obj in settings obj array
		this.settings_n_data_objects_array.push( new this.settings_and_data_obj( this ) );

		// get index?
		var num_of_curr_settings_obj = this.settings_n_data_objects_array.length -1;

		// set lower resolution 
		this.settings_n_data_objects_array[ num_of_curr_settings_obj ].points__global_subdivision__gridsize_latitude_y__in_km = 350;
		this.settings_n_data_objects_array[ num_of_curr_settings_obj ].points__global_subdivision__gridsize_longitude_x__in_km = 350;

		// set visuals
		this.settings_n_data_objects_array[ num_of_curr_settings_obj ].coords_point__width_px_x = 8;
		this.settings_n_data_objects_array[ num_of_curr_settings_obj ].coords_point__height_px_y = 8;

		this.settings_n_data_objects_array[ num_of_curr_settings_obj ].coords_point__fill_colour = "rgba( 200, 200, 200, 0.5 )";

		// set coord sys subdivision
		//// this.settings_n_data_objects_array[ num_of_curr_settings_obj ].set_using_global_subdivision();

		// add text description
		this.settings_n_data_objects_array[ num_of_curr_settings_obj ].free_text_description_of_object = "low resolution grid for testing non-intersection calculations.";		

		// generate poins according to settings 
		this.generate_grid_points_for_given_settings_object( this.settings_n_data_objects_array[ num_of_curr_settings_obj ] );


		// ---- test NON-intersections TWO : find non-intersecting points 
		// 		eg. find the points of settings obj 0 that don't intersect w settings obj 1


		console.log("--- testing NON-intersecionts :) btw settings obj 0 and settings obj 1 ");
		// 
		this.get__points_in_one_settings_obj_that_are_NOT_near_points_in_another_settings_obj__KEEP_the_first_array__if_NO_NO_NO_overlap_with_COMPARE_array( calc_coords2.settings_n_data_objects_array[3], calc_coords2.settings_n_data_objects_array[1], 100 );

		// add a description
		///// this.settings_n_data_objects_array[ 4 ].free_text_description_of_object = "non-intersection.";

		// set which settings objects we're drawing… 
		calc_coords2.rendering__indicies_of_settings_objects_to_draw__as_array = [0,2,4];

		// -- and give a bit more feedback : 
		this.print_num_of_coordinate_points_in_each_settings_obj();
	}


	// --- TEST : load exernal file, to get a settings object…

	this.TEST_load_external_coords_to_make_settings_obj = function(){
		console.log(">>>> TEST_load_external_coords_to_make_settings_obj() ");

		var filepath_to_external_coords_data = "http://sourisr.kapsi.fi/luftdaten/luftDaten_data_explorations/ld_daten_various/generated_coords/python_geocalc_coords.json";

		this.load_external_coords_data__create_settings_object_with_this__part_one( filepath_to_external_coords_data, calc_coords2 );

	}



	// --- NEW TEST : load exernal file, to get a settings object… NOW WITH EXTRA METADATA! 

	this.TEST_load_external_coords_AND_METADATA_to_make_settings_obj = function(){
		console.log(">>>> TEST_load_external_coords_AND_METADATA_to_make_settings_obj() ");

		var filepath_to_external_coords_data = "http://sourisr.kapsi.fi/luftdaten/luftDaten_data_explorations/ld_daten_various/generated_coords/python_geocalc_coords.json";

		this.load_external_coords_data__AND_OTHER_METADATA__create_settings_object_with_this__PART_ONE( filepath_to_external_coords_data, calc_coords2 );

	}	




	// --- make new settings + data object? 

	this.make_new_TEST_settings_n_data_obj__with_global_subdivision = function(){
		console.log(">>>> make_new_TEST_settings_n_data_obj__with_global_subdivision() ");

		this.settings_n_data_objects_array.push( new this.settings_and_data_obj( this ) );

		var len_of_settings_array =  this.settings_n_data_objects_array.length;

		// this.settings_n_data_objects_array[ len_of_settings_array-1 ].set_using_global_subdivision();

		//// make points! 

		this.generate_grid_points_for_given_settings_object( this.settings_n_data_objects_array[ len_of_settings_array-1 ] );
	}

	// ----- feedback - print num of points in all settings objects

	this.print_num_of_coordinate_points_in_each_settings_obj = function(){
		console.log("\n>>>> print_num_of_coordinate_points_in_each_settings_obj() ");

		console.log("\n\t --- printing num of latitude_and_longitude_positions in the "+this.settings_n_data_objects_array.length+" objects ");

		for( var i = 0; i < this.settings_n_data_objects_array.length; i++ ){

			console.log("setings obj "+i+"/"+this.settings_n_data_objects_array.length+" : "+this.settings_n_data_objects_array[i].latitude_and_longitude_positions.length+" \n\t : grid spacing : lat/lon : "+this.settings_n_data_objects_array[i].points__global_subdivision__gridsize_latitude_y__in_km+" / "+this.settings_n_data_objects_array[i].points__global_subdivision__gridsize_longitude_x__in_km+" \n\t - "+this.settings_n_data_objects_array[i].free_text_description_of_object+" | "+this.settings_n_data_objects_array[i].current__what_kind_of_geometry_object  );
		}
	}


	// ----- GEOMETRY CALCULATIONS! 

	this.generate_grid_points_for_given_settings_object = function( given_settings_obj ){
		console.log(">>>> generate_grid_points_for_given_settings_object() ");

		// the rather lengthy startup feedback! … ?!
		console.log("\t--- generating points for settings : \n\t\t grid layout mode : |"+given_settings_obj.what_kind_of_points_layout+"| \n\t\t grid size lat/lon "+given_settings_obj.points__global_subdivision__gridsize_latitude_y__in_km+"/"+given_settings_obj.points__global_subdivision__gridsize_longitude_x__in_km+" \n\t\t geo limits : for global layout : lat  "+given_settings_obj.geo_limits__global__left_longitude_limit__as_decimal__from_left_to_right+"/"+given_settings_obj.geo_limits__global__right_longitude_limit__as_decimal__from_left_to_right+" | long :  "+given_settings_obj.geo_limits__global__top_latitude_limit__as_decimal__from_top_to_bottom+"/"+given_settings_obj.geo_limits__global__bottom_latitude_limit__as_decimal__from_top_to_bottom+"  \n\t\t \n\t\t and gridsize in pixels : "+given_settings_obj.points__screen_subdivision__gridsize_horizontal_x__in_px+"/"+given_settings_obj.points__screen_subdivision__gridsize_vertical_y__in_px+" \n\t\t geo limits for screen grid layout : horisontal  "+given_settings_obj.geo_limits__global__left_latitude_limit__as_pixels__from_left_to_right_x+"/"+given_settings_obj.geo_limits__global__right_latitude_limit__as_pixels__from_left_to_right_x+" | vertical  "+given_settings_obj.geo_limits__global__left_longitude_limit__as_pixels__from_top_to_bottom_y+"/"+given_settings_obj.geo_limits__global__right_longitude_limit__as_pixels__from_top_to_bottom_y );

		// ------- local variables 

		var grid_points_LOCAL_VAR = []; 



		// -------- make points 

		// --- what kind of points - global or screen coords? 

		if( given_settings_obj.what_kind_of_points_layout == given_settings_obj.what_kind_of_points_layout__preset__global_subdivision ){							

			// --- get vertical angle steplength, for given vertical gridsize 

			var curr_vertical_angle_steplength_given_vertical_steplength__as_decimal_of_half_circle = this.get_latitude_angle_stepsize__as_decimal_of_half_circle__for_given_grid_stepsise_of_curr_setings_obj( given_settings_obj );

			console.log( " -- got a vertical angle step length of "+curr_vertical_angle_steplength_given_vertical_steplength__as_decimal_of_half_circle );

			// --- loop and fetch some nice coordinates :) 

			// - loop vertical y ( latitude ) ( going bottom to top, due to funny geometry angle things… 
			//    ( angle 0 is on the horisontal ))
			// for( var curr_lon = given_settings_obj.geo_limits__global__bottom_latitude_limit__as_decimal__from_top_to_bottom ; curr_lon < given_settings_obj.geo_limits__global__top_latitude_limit__as_decimal__from_top_to_bottom; curr_lon += curr_vertical_angle_steplength_given_vertical_steplength__as_decimal_of_half_circle ){

			// before chaning lat/long relationship	 20190827
			// for( var curr_lon__in_radians = given_settings_obj.geo_limits__global__top_latitude_limit__as_decimal__from_top_to_bottom ; curr_lon__in_radians < given_settings_obj.geo_limits__global__bottom_latitude_limit__as_decimal__from_top_to_bottom; curr_lon__in_radians += curr_vertical_angle_steplength_given_vertical_steplength__as_decimal_of_half_circle ){
			for( var curr_lat__in_decimals = given_settings_obj.geo_limits__global__top_latitude_limit__as_decimal__from_top_to_bottom ; curr_lat__in_decimals < given_settings_obj.geo_limits__global__bottom_latitude_limit__as_decimal__from_top_to_bottom; curr_lat__in_decimals += curr_vertical_angle_steplength_given_vertical_steplength__as_decimal_of_half_circle ){

					// convert to lat/lon? 
					var curr_lat_as_coord_sys_angle = this.get__bounded_coord_system_LAT_coord_from_decimal_coord_value( curr_lat__in_decimals );


					// feedback 
					// console.log("\n ---- points gen loop : \n\t curr lat decimal : "+curr_lat__in_decimals );

					// get circumference at this angle 
					var curr_circumference__in_km__at_this_decimal_half_circle_angle = this.get__curr_circumference__in_km__at_this_decimal_half_circle_angle( curr_lat__in_decimals );

					// console.log(" ---- ---- curr Circumference : "+curr_circumference__in_km__at_this_decimal_half_circle_angle );

					// get decimal steplength 
					var curr_horisontal_steplength_as_decimal_of_circle_given_curr_circumference_and_desired_horisontal_stepsize_in_km = this.get__curr_horisontalLongitude_stepsize__as_decimal__of_full_circle__given_horisontal_stepsize_in_km__and__given_circumference_in_km( curr_circumference__in_km__at_this_decimal_half_circle_angle, given_settings_obj );




					// console.log(" --- --- curr horisontal stepsize as decimal of circle : "+curr_horisontal_steplength_as_decimal_of_circle_given_curr_circumference_and_desired_horisontal_stepsize_in_km );
					
					// -- loop horizontal - longitude :) 
					for( var curr_long__in_decimals = given_settings_obj.geo_limits__global__left_longitude_limit__as_decimal__from_left_to_right ; curr_long__in_decimals < given_settings_obj.geo_limits__global__right_longitude_limit__as_decimal__from_left_to_right; curr_long__in_decimals += curr_horisontal_steplength_as_decimal_of_circle_given_curr_circumference_and_desired_horisontal_stepsize_in_km ){


						// console.log(" --- ---- --- now adding angle |"+curr_long__in_decimals+"| ");
						/*
							to do : 
								- get final position …
								( - convert to lat/lon? <-- needed to plot on leaflet! 
								- add to positions array …  ) 								
						*/

						// get current position as an angle 
						//////// var curr_long__in_decimals_as_angle__in_radians = curr_long__in_decimals; 


						// get longX position … 
						var curr_LON_as_coord_sys_angle = this.get__bounded_coord_system_LONG_coord_from_decimal_coord_value( curr_long__in_decimals );


						// ------------  SAVE POSTITIONS ------------

						var curr_out_coords_set = { "lat_angle_in_radians" : curr_lat__in_decimals, "lat_angle_as_coord_sys_degrees" : curr_lat_as_coord_sys_angle, "lon_angle_in_radians" : curr_long__in_decimals, "long_angle_as_coord_sys_degrees" : curr_LON_as_coord_sys_angle };

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

	this.get_latitude_angle_stepsize__as_decimal_of_half_circle__for_given_grid_stepsise_of_curr_setings_obj = function( given_settings_obj ){
		console.log(">>>> get_latitude_angle_stepsize__as_decimal_of_half_circle__for_given_grid_stepsise_of_curr_setings_obj() ");
		console.log(" --- earths_circumference__around_poles__in_km : "+this.HALF_earths_circumference__around_poles__in_km+" grid step length along longitude : "+given_settings_obj.points__global_subdivision__gridsize_longitude_x__in_km+" km" );

			return ( given_settings_obj.points__global_subdivision__gridsize_latitude_y__in_km/this.HALF_earths_circumference__around_poles__in_km ); 
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


	this.get__curr_circumference__in_km__at_this_decimal_half_circle_angle = function( curr_lat_as_decimal_of_half_circle ){
		// console.log(">>>> get__curr_circumference__in_km__at_this_decimal_half_circle_angle - curr lat : |"+curr_lat_as_decimal_of_half_circle+"|" );

		// 20190816 - TESTING doing + 1/2 PI rather than - 1/2 PI. 
		// 				- so rather than the angle beginning at the south pole, it begins at the north pole.
		// var curr_angle_in_radians = ( Math.PI * curr_lat_as_decimal_of_half_circle ) - this.half_pi ;
		var curr_angle_in_radians = ( Math.PI * curr_lat_as_decimal_of_half_circle ) + this.half_pi ;

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

		// console.log(">>>> get__max_degree_angle_to_next_point__given_max_distance_in_km_and_laty - got distance |"+max_distance_in_km+"| and laty : |"+given_laty+"|" );

		var curr_angle_in_radians = this.get__radians_angle_from_map_degree_angle( given_laty );

		var radius_at_given_latY_angle = this.get__earth_radius_at_given_latY_angle_in_km( curr_angle_in_radians );

		var circumferance_at_that_angle = this.get__earth_circumferance_given_radius__in_km( radius_at_given_latY_angle );

		var angle_for_needed_distance__as_decimal_of_full_circle = this.get__angle_in_decimals_of_full_circle__needed_to_produce_given_distance__at_given_circumferance( circumferance_at_that_angle, max_distance_in_km );

		return this.get__angle_as_coordinates_of_map__given_angle_as_decimal_of_full_circle( angle_for_needed_distance__as_decimal_of_full_circle );
	}


	// ---- get latitude ( ie horisontal/x ) steplength for current horisontal stepsize as decimal of circle

	this.get__curr_horisontalLongitude_stepsize__as_decimal__of_full_circle__given_horisontal_stepsize_in_km__and__given_circumference_in_km = function( curr_circumference_in_km, given_settings_obj ){
		// console.log( ">>>> get__curr_horisontalLongitude_stepsize__as_decimal__of_full_circle__given_horisontal_stepsize_in_km__and__given_circumference_in_km() - curr_circumference_in_km : "+curr_circumference_in_km );

		// changed variable for lat/long conversion 20190827
		return ( given_settings_obj.points__global_subdivision__gridsize_longitude_x__in_km / curr_circumference_in_km );
	}


	// ---- degree conversion, etc…

	// decimal value to unbounded decimal LAT angle 
	this.get__bounded_coord_system_LONG_coord_from_decimal_coord_value = function( in_angle ){

		var out_angle = in_angle;
		out_angle = this.get__unbounded_long_degree_angle__given_decimal_circle_value( out_angle );

		return this.get__coordinate_system_long_angle__given__360deg_lat_angle( out_angle );
	}

	// decimal value to unbounded decimal LONG angle 
	this.get__bounded_coord_system_LAT_coord_from_decimal_coord_value = function( in_angle ){

		var out_angle = in_angle;
		out_angle = this.get__unbounded_lat_degree_angle__given_decimal_half_circle_value( out_angle );

		return this.get__coordinate_system_lat_angle__given__180deg_long_angle( out_angle );
	}



	// - LAT decimal to 360° angle ( conversion to regular coordinate systems angle lat )
	this.get__unbounded_long_degree_angle__given_decimal_circle_value = function( in_angle_as_decimal ){

		return 360 * in_angle_as_decimal ;
	}

	// - LAT decimal to 180° angle ( conversion to regular coordinate systems angle long )
	this.get__unbounded_lat_degree_angle__given_decimal_half_circle_value = function( in_angle_as_decimal ){

		return 180 * in_angle_as_decimal ;
	}

	// - unbounded longitude angle ( 0->360° ) to regular coords sys LATITUDE angle ( -180° <-> 180° )
	this.get__coordinate_system_long_angle__given__360deg_lat_angle = function( in_angle ){

		var out_angle = in_angle % 360;

		if( out_angle > 180 ){
			out_angle = -180 + ( out_angle % 180 );
		}

		return out_angle;
	}

	// - unbounded LATIUTUDE angle ( 0-180°)  to regular coord sys angle ( -90° <-> 90° )
	this.get__coordinate_system_lat_angle__given__180deg_long_angle = function( in_angle ){

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
		console.log("---- get__given_day_sensor_data_from_main_object__as_settings_obj_coords ----- so all that took "+( new Date() - starttime )+" ms" );

	}

	// ---- get unique sensor id locations from sensor data file/object



	// GET the unique sensor positions from Todays and Yesterdays data files. 
	// - remember to wipe the data files later 
	this.get_unique_sensor_locs_from_yesterdays_and_todays_sensor_data_files = function( local_root ){
		console.log(">>>> get_unique_sensor_locs_from_yesterdays_and_todays_sensor_data_files() ");

		var starttime = new Date();

		// where it should all end up in the end , sensor locs that is, 
		local_root.relevant_sensor_locs__in_lat_long_tuple_format = [];

		// temp : found sensor ids and associated lat/longs 
		var temp__found_sensor_ids_and_associated_latLongs = {};

		// --- run : 

		// concatenate the lists 
		var yesterday_and_todays__sensor_ids = local_root.TODAYS_historic_luftdaten['sensor_ids'].concat( local_root.YESTERDAY_historic_luftdaten['sensor_ids'] );

		var yesterday_and_todays__lat_longs = local_root.TODAYS_historic_luftdaten['lat_lon'].concat( local_root.YESTERDAY_historic_luftdaten['lat_lon'] );

		console.log("\t--- concatenated the sensor id and lat/long arrays of todays and yesterdays files : sensor id original + original = sum local_root: "+local_root.TODAYS_historic_luftdaten['sensor_ids'].length+" + "+local_root.YESTERDAY_historic_luftdaten['sensor_ids'].length+" = "+yesterday_and_todays__sensor_ids.length+" | lat/logn id original + original = sum : : "+local_root.TODAYS_historic_luftdaten['lat_lon'].length+"/"+local_root.YESTERDAY_historic_luftdaten['lat_lon'].length+" = "+yesterday_and_todays__lat_longs.length );


		// ---- find unique lat longs

		for( var i = 0; i < yesterday_and_todays__sensor_ids.length; i++ ){

			if( yesterday_and_todays__sensor_ids[i] in temp__found_sensor_ids_and_associated_latLongs ){
				continue;
			}else{
				temp__found_sensor_ids_and_associated_latLongs[ yesterday_and_todays__sensor_ids[i] ] = { 'latlong' : yesterday_and_todays__lat_longs[i] };
			}

		}

		// feedback
		console.log("--- cool! - got "+Object.keys( temp__found_sensor_ids_and_associated_latLongs ).length+" unique sensor ids - timin so far is "+( new Date() - starttime ) );

		// --- turn output into a pure array … 

		for( key in temp__found_sensor_ids_and_associated_latLongs ){

			local_root.relevant_sensor_locs__in_lat_long_tuple_format.push( temp__found_sensor_ids_and_associated_latLongs[key]['latlong'] )
		}

		// --- feedback 

		console.log("|||| done! - got "+local_root.relevant_sensor_locs__in_lat_long_tuple_format.length+" unique sensor lat/longs . and all this in "+( new Date() - starttime )+" ms " );
	}





	// ---- import sensor coords from online … 

	this.retrieve_sensor_coords_from_online__WITH_NODE = function( local_root ){
		console.log(">>>> retrieve_sensor_coords_from_online() ");

		// time
		var starttime = new Date();

		// localise 
		var root_ = local_root;

		// get lib 
		const request = require('request');


		// REMEMBER TO GENERATE THE RIGHT ONE! 
		// var url = "http://sourisr.kapsi.fi/luftdaten/luftDaten_data_explorations/ld_daten_various/tabular_ld_data__480_s_intervals/24_hrs_pm_data__starting_from__2019-9-4.json";

		var url = root_.generate_url_for_data_from_date_object( new Date() );

		console.log( "\t --- got an url for today, and it looks like this : |"+url+"|" );
		console.log("\t -------- starting to fetch data! -------- ")

		// FETCH… err…request 
		request( url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		     root_.latest_historic_luftdaten_file_by_miska = JSON.parse(body);
		     //
		     console.log("--- fetched data! - done in "+( new Date() - starttime )+" ms"  );

		     // now move on to the next stage 
		     root_.TEST__make_settings_objects__save_to_external_file__PART_TWO_of_TWO( root_ );
		  }
		});

	}




	this.retrieve_sensor_coords_from_online__YESTERDAY_AND_TODAYS_FILES__WITH_NODE = function( local_root ){
		console.log(">>>> retrieve_sensor_coords_from_online() ");

		// time
		var starttime = new Date();

		// localise 
		var root_ = local_root;

		// get lib 
		const request = require('request');


		// REMEMBER TO GENERATE THE RIGHT ONE! 
		// var url = "http://sourisr.kapsi.fi/luftdaten/luftDaten_data_explorations/ld_daten_various/tabular_ld_data__480_s_intervals/24_hrs_pm_data__starting_from__2019-9-4.json";

		// url : today's data file 
		var today_data_url = root_.generate_url_for_data_from_date_object( new Date() );

		// url : yesterday's data file 
		var yesterday_data_url = root_.get_yesterdays_date__as_YYMMDD_url_string();


		// console.log( "\t --- got an url for today, and it looks like this : |"+url+"|" );
		console.log("\t -------- starting to fetch data! -------- ")
		console.log("\t ---- at |"+today_data_url+"|" );

		// FETCH… err…request 
		// - FIRST fetch : today's date data file 
		request( today_data_url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("--- got TODAY data as string : first 100 chrs looks like this : ");
				console.log( body.slice( 0, 100 ) );
			    root_.TODAYS_historic_luftdaten = JSON.parse(body);
			    //
			    console.log("--- fetched data file for TODAY! - done in "+( new Date() - starttime )+" ms"  );
			    console.log("\t ---- noew fetching yesterday's data file, at |"+yesterday_data_url+"|" );

			    // NEXT : get yesterday's file too 
				// FETCH… err…request 
				request( yesterday_data_url, function (error, response, body) {
					if (!error && response.statusCode == 200) {
						root_.YESTERDAY_historic_luftdaten = JSON.parse(body);
						//
						console.log("--- fetched YESTERDAYS data fle! - done in "+( new Date() - starttime )+" ms - "  );



					 // THEN STAGE TWO OF TWO? 
					 root_.TEST__make_settings_objects__save_to_external_file__PART_TWO_of_TWO( root_ );

					}
				});


			}
		});

	}


	// ---- find points in one settings grid obj that are near points in another settings grid obj

	this.get__points_in_one_settings_obj_that_are_near_points_in_another_settings_obj__KEEP_the_first_array__if_overlap_with_COMPARE_array = function( settings_obj__with_points_to_keep, settings_obj__which_points_one_compares_with, max_dist_to_other_point__in_km_ ){

		console.log("get__points_in_one_settings_obj_that_are_near_points_in_another_settings_obj__KEEP_the_first_array__if_overlap_with_COMPARE_array() - with a max distance of "+max_dist_to_other_point__in_km_+" km to other points ");

		// - timing
		var starttime = new Date();


		// ------- variables

		// var out_points = [];

		// locallise the values …  for speed 
		var max_dist_to_other_point__in_km = max_dist_to_other_point__in_km_;
		var object_points_KEEP = settings_obj__with_points_to_keep;
		var object_points_COMPARE = settings_obj__which_points_one_compares_with;

		var out_points = new Array( object_points_KEEP.latitude_and_longitude_positions.length );
		var out_points__curr_i = 0; // index 

		console.log( "\t --- settings_obj__with_points_to_keep : ");
		console.log( object_points_KEEP );
		console.log( "\t --- Number of object_points_KEEP.latitude_and_longitude_positions positions : ")
		console.log( object_points_KEEP.latitude_and_longitude_positions.length );
		console.log( "\t --- Number of object_points_COMPARE.latitude_and_longitude_positions positions : ")
		console.log( object_points_COMPARE.latitude_and_longitude_positions.length );

		// - how many degrees is the given max distance to another point, at the given ( key : ) latitude 
		// 		- ie : key : lattitude | value : max distance to a point, in degrees
		var lookup_array__max_distance_in_degrees_to_next_point_at_given_lat = {};

		// loop through the object which points we want to keep 
		// NOET NOTE NOTE : limiting to 10 points comparison 
		// for( var obj_pts_KEEP_i = 0; obj_pts_KEEP_i < 10; obj_pts_KEEP_i++ ){
		for( var obj_pts_KEEP_i = 0; obj_pts_KEEP_i < object_points_KEEP.latitude_and_longitude_positions.length; obj_pts_KEEP_i++ ){


			if( obj_pts_KEEP_i % 1000 == 0 ){

				console.log("--- intersectin checking : working on point KEEP # "+obj_pts_KEEP_i );
			}
			// console.log("\t\t --- working on keep point # "+obj_pts_KEEP_i+", which looks like this ");
			// console.log( object_points_KEEP.latitude_and_longitude_positions[ obj_pts_KEEP_i ] );

			// -- check if exists / get the max degrees distance to a valid near point, at this latitude 

			// localise lat/long
			var curr_lat =  object_points_KEEP.latitude_and_longitude_positions[ obj_pts_KEEP_i ]['lat_angle_as_coord_sys_degrees'];
			var curr_long = object_points_KEEP.latitude_and_longitude_positions[ obj_pts_KEEP_i ]['long_angle_as_coord_sys_degrees'];
			
/*
			// for lookup operations : 
			var curr_lat_as_string = String( curr_lat );
			// initialise max distance variable 
			var curr_max_degree_distance_to_other_point = 1000000;

			// check if the relevant max distance to another point
			//		is already in the lookup table 
			if( curr_lat_as_string in lookup_array__max_distance_in_degrees_to_next_point_at_given_lat ){
				// console.log("--- yes! the current lat ("+curr_lat_as_string+") is in the lookup table ");

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
*/

			// NO CACHE ( LOOKUP ) VERSION : 
			var curr_max_degree_distance_to_other_point = this.get__max_degree_angle_to_next_point__given_max_distance_in_km_and_laty( max_dist_to_other_point__in_km, curr_lat );


			// console.log("\t --- curr_max_degree_distance_to_other_point : "+curr_max_degree_distance_to_other_point+" - at this latitude ("+curr_lat+")" );
			// --- loop through the points in the other (comparison) array 
			// // // 
			// // // loop loop loop
			// // // 
/*
			console.log("--- object_points_COMPARE looks like this : ");
			console.log( object_points_COMPARE );
			console.log("--- and the object_points_COMPARE.latitude_and_longitude_positions array looks like this : ");
			console.log( object_points_COMPARE.latitude_and_longitude_positions );
			var length_of_obj_COMPARE_coords_array = object_points_COMPARE.latitude_and_longitude_positions.length;
			console.log( "---- of_obj_COMPARE_coords_array : "+length_of_obj_COMPARE_coords_array );
*/

			// NOTE 
			// NOTE : LIMITED NUMBEr OF POINTs! 
			// NOTE 
			// for( var obj_pts__COMPARE_i = 0; obj_pts__COMPARE_i < 10; obj_pts__COMPARE_i++  ){
			for( var obj_pts__COMPARE_i = 0; obj_pts__COMPARE_i < object_points_COMPARE.latitude_and_longitude_positions.length; obj_pts__COMPARE_i++  ){
			// for( var obj_pts__COMPARE_i = 0; obj_pts__COMPARE_i < length_of_obj_COMPARE_coords_array; obj_pts__COMPARE_i++ ){

				// console.log("\t\t - working on pt # "+obj_pts__COMPARE_i );

				// localise
				var comparison_pt_laty = object_points_COMPARE.latitude_and_longitude_positions[ obj_pts__COMPARE_i ]['lat_angle_as_coord_sys_degrees'];
				var comparison_pt_longx = object_points_COMPARE.latitude_and_longitude_positions[ obj_pts__COMPARE_i ]['long_angle_as_coord_sys_degrees'];

				var dist_btw_pts = this.get__distance_to_other_point__in_settings_obj_points_format__longwinded_input( curr_lat, comparison_pt_laty, curr_long, comparison_pt_longx );

	/*
				console.log("\t\t --- point A lat/long : "+curr_lat+", "+curr_long );
				console.log("\t\t --- point B lat/long : "+comparison_pt_laty+", "+comparison_pt_longx );
				console.log("\t\t ---- dist btw pts : "+dist_btw_pts );
	*/

				// now check if the distance between the two is small enough that 
				// we can say that this point should be saved as one 
				//  overlapping with sensors


				if( dist_btw_pts < curr_max_degree_distance_to_other_point ){

					// make new object to save… 

					var point_to_save = { "lat_angle_as_coord_sys_degrees" : curr_lat, "long_angle_as_coord_sys_degrees" : curr_long };

					// feedback? 
					out_points[ out_points__curr_i ] = point_to_save ;

					// advance index of found points 
					out_points__curr_i++;
				/*
					console.log("--- got an intersection at point : ");
					console.log( point_to_save );
					console.log(" ------ curr_max_degree_distance_to_other_point : "+curr_max_degree_distance_to_other_point );
				*/

					// break out of the loop
					break;
				}

			}



				//  get dx/dy
				//  get diagonal distance 
				//  check if distance is smaller than max distance 
				// IF SMALLER THAN MAX DISTANCE :
					// save point in keep array 
					// break ( we don't need to check any more points, as we've found that the given keep point is witin distance of a sensor )
		}

		// reduce length of out points array to the length of found points
		out_points = out_points.slice( 0, out_points__curr_i );


		// ------ set up new settings object and save the points there 

		var new_settings_object_with_keep_points = new this.settings_and_data_obj( this );

		// -- give it some properties … features… 
		new_settings_object_with_keep_points.what_kind_of_geometry_object__intersection_coords_object = new_settings_object_with_keep_points.what_kind_of_geometry_object__intersection_coords_object ; 

		new_settings_object_with_keep_points.free_text_description_of_object = "Object with grid points that DO INTERSECT WITH other object point locations, eg SENSOR LOCATIONS."; 

		// copy grid spacing settings of source object 
		new_settings_object_with_keep_points.points__global_subdivision__gridsize_latitude_y__in_km = settings_obj__with_points_to_keep.points__global_subdivision__gridsize_latitude_y__in_km; 
		new_settings_object_with_keep_points.points__global_subdivision__gridsize_longitude_x__in_km = settings_obj__with_points_to_keep.points__global_subdivision__gridsize_longitude_x__in_km; 

		//make the pixels a bit bigger
		new_settings_object_with_keep_points.coords_point__width_px_x = 8;

		new_settings_object_with_keep_points.coords_point__height_px_y =  8; 

		// and set the colour otherwise 
		new_settings_object_with_keep_points.coords_point__fill_colour = "rgba( 255, 0, 0, 0.5 )";


		// ---- GIVE IT SOME NICE COORDINATES 
		new_settings_object_with_keep_points.latitude_and_longitude_positions = out_points;

		// ----- ---- and save it 
		this.settings_n_data_objects_array.push( new_settings_object_with_keep_points );


		// ---- feedback
		console.log("---- ok, done, so that intersection action ( overlap ) took "+( new Date() - starttime)+" ms - got "+new_settings_object_with_keep_points.latitude_and_longitude_positions.length+" poins ");
	}



	// --- as above but… DON'T KEEP THE OVERLAPPING POINTS OF KEEP ARRAY

	// ---- find points in one settings grid obj that are near points in another settings grid obj

	this.get__points_in_one_settings_obj_that_are_NOT_near_points_in_another_settings_obj__KEEP_the_first_array__if_NO_NO_NO_overlap_with_COMPARE_array = function( settings_obj__with_points_to_keep, settings_obj__which_points_one_compares_with, max_dist_to_other_point__in_km_ ){

		console.log("get__points_in_one_settings_obj_that_are_NOT_near_points_in_another_settings_obj__KEEP_the_first_array__if_NO_NO_NO_overlap_with_COMPARE_array() - with a max distance of "+max_dist_to_other_point__in_km_+" km to other points ");

		// - timing
		var starttime = new Date();


		// ------- variables

		// var out_points = [];

		// locallise the values …  for speed 
		var max_dist_to_other_point__in_km = max_dist_to_other_point__in_km_;
		var object_points_KEEP = settings_obj__with_points_to_keep;
		var object_points_COMPARE = settings_obj__which_points_one_compares_with;

		var out_points = new Array( object_points_KEEP.latitude_and_longitude_positions.length );
		var out_points__curr_i = 0; // index 

		console.log( "\t --- settings_obj__with_points_to_keep : ");
		console.log( object_points_KEEP );
		console.log( "\t --- Number of object_points_KEEP.latitude_and_longitude_positions positions : ")
		console.log( object_points_KEEP.latitude_and_longitude_positions.length );
		console.log( "\t --- Number of object_points_COMPARE.latitude_and_longitude_positions positions : ")
		console.log( object_points_COMPARE.latitude_and_longitude_positions.length );

		// - how many degrees is the given max distance to another point, at the given ( key : ) latitude 
		// 		- ie : key : lattitude | value : max distance to a point, in degrees
		var lookup_array__max_distance_in_degrees_to_next_point_at_given_lat = {};

		// loop through the object which points we want to keep 
		// NOET NOTE NOTE : limiting to 10 points comparison 
		// for( var obj_pts_KEEP_i = 0; obj_pts_KEEP_i < 10; obj_pts_KEEP_i++ ){
		for( var obj_pts_KEEP_i = 0; obj_pts_KEEP_i < object_points_KEEP.latitude_and_longitude_positions.length; obj_pts_KEEP_i++ ){


			if( obj_pts_KEEP_i % 1000 == 0 ){

				console.log("--- intersectin checking : working on point KEEP # "+obj_pts_KEEP_i );
			}
			// console.log("\t\t --- working on keep point # "+obj_pts_KEEP_i+", which looks like this ");
			// console.log( object_points_KEEP.latitude_and_longitude_positions[ obj_pts_KEEP_i ] );

			// -- check if exists / get the max degrees distance to a valid near point, at this latitude 

			// localise lat/long
			var curr_lat =  object_points_KEEP.latitude_and_longitude_positions[ obj_pts_KEEP_i ]['lat_angle_as_coord_sys_degrees'];
			var curr_long = object_points_KEEP.latitude_and_longitude_positions[ obj_pts_KEEP_i ]['long_angle_as_coord_sys_degrees'];
			
/*
			// for lookup operations : 
			var curr_lat_as_string = String( curr_lat );
			// initialise max distance variable 
			var curr_max_degree_distance_to_other_point = 1000000;

			// check if the relevant max distance to another point
			//		is already in the lookup table 
			if( curr_lat_as_string in lookup_array__max_distance_in_degrees_to_next_point_at_given_lat ){
				// console.log("--- yes! the current lat ("+curr_lat_as_string+") is in the lookup table ");

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
*/

			// NO CACHE ( LOOKUP ) VERSION : 
			var curr_max_degree_distance_to_other_point = this.get__max_degree_angle_to_next_point__given_max_distance_in_km_and_laty( max_dist_to_other_point__in_km, curr_lat );


			// console.log("\t --- curr_max_degree_distance_to_other_point : "+curr_max_degree_distance_to_other_point+" - at this latitude ("+curr_lat+")" );
			// --- loop through the points in the other (comparison) array 
			// // // 
			// // // loop loop loop
			// // // 
/*
			console.log("--- object_points_COMPARE looks like this : ");
			console.log( object_points_COMPARE );
			console.log("--- and the object_points_COMPARE.latitude_and_longitude_positions array looks like this : ");
			console.log( object_points_COMPARE.latitude_and_longitude_positions );
			var length_of_obj_COMPARE_coords_array = object_points_COMPARE.latitude_and_longitude_positions.length;
			console.log( "---- of_obj_COMPARE_coords_array : "+length_of_obj_COMPARE_coords_array );
*/

			// register whether an overlap has been found in the KEEP array, 
			//    to a point in the compare array
			var overlap_btw_keep_and_compare_array_points = false;

			// loop and check if overlap
			// for( var obj_pts__COMPARE_i = 0; obj_pts__COMPARE_i < 10; obj_pts__COMPARE_i++  ){
			for( var obj_pts__COMPARE_i = 0; obj_pts__COMPARE_i < object_points_COMPARE.latitude_and_longitude_positions.length; obj_pts__COMPARE_i++  ){
			// for( var obj_pts__COMPARE_i = 0; obj_pts__COMPARE_i < length_of_obj_COMPARE_coords_array; obj_pts__COMPARE_i++ ){

				// console.log("\t\t - working on pt # "+obj_pts__COMPARE_i );

				// localise
				var comparison_pt_laty = object_points_COMPARE.latitude_and_longitude_positions[ obj_pts__COMPARE_i ]['lat_angle_as_coord_sys_degrees'];
				var comparison_pt_longx = object_points_COMPARE.latitude_and_longitude_positions[ obj_pts__COMPARE_i ]['long_angle_as_coord_sys_degrees'];

				var dist_btw_pts = this.get__distance_to_other_point__in_settings_obj_points_format__longwinded_input( curr_lat, comparison_pt_laty, curr_long, comparison_pt_longx );

	/*
				console.log("\t\t --- point A lat/long : "+curr_lat+", "+curr_long );
				console.log("\t\t --- point B lat/long : "+comparison_pt_laty+", "+comparison_pt_longx );
				console.log("\t\t ---- dist btw pts : "+dist_btw_pts );
	*/

				// now check if the distance between the two is small enough that 
				// we can say that this point should be saved as one 
				//  overlapping with sensors


				if( dist_btw_pts < curr_max_degree_distance_to_other_point ){

					// OOOPS, we don't like overlaps… 
					// - we can skip the rest of the comparisons … as this KEEP 
					//	point is then not a lot of use… :( 

					overlap_btw_keep_and_compare_array_points = true;

					// break out of the loop
					break;
				}

			}

			// if NO OVERLAP? … then save the current keep point … 
			if( overlap_btw_keep_and_compare_array_points == false ){

				var point_to_save = { "lat_angle_as_coord_sys_degrees" : curr_lat, "long_angle_as_coord_sys_degrees" : curr_long };

				// feedback? 
				out_points[ out_points__curr_i ] = point_to_save ;

				// advance index of found points 
				out_points__curr_i++;
			}

		}

		// reduce length of out points array to the length of found points
		out_points = out_points.slice( 0, out_points__curr_i );


		// ------ set up new settings object and save the points there 

		var new_settings_object_with_keep_points = new this.settings_and_data_obj( this );

		// -- give it some properties … features… 
		new_settings_object_with_keep_points.what_kind_of_geometry_object__intersection_coords_object = new_settings_object_with_keep_points.what_kind_of_geometry_object__intersection_coords_object ; 

		new_settings_object_with_keep_points.free_text_description_of_object = "Object with grid points WITH NO INTERSECTION WITH other object point locations, eg SENSOR LOCATIONS."; 

		// copy grid spacing settings of source object 
		new_settings_object_with_keep_points.points__global_subdivision__gridsize_latitude_y__in_km = settings_obj__with_points_to_keep.points__global_subdivision__gridsize_latitude_y__in_km; 
		new_settings_object_with_keep_points.points__global_subdivision__gridsize_longitude_x__in_km = settings_obj__with_points_to_keep.points__global_subdivision__gridsize_longitude_x__in_km; 

		//make the pixels a bit bigger
		new_settings_object_with_keep_points.coords_point__width_px_x = 8;

		new_settings_object_with_keep_points.coords_point__height_px_y =  8; 

		// and set the colour otherwise 
		new_settings_object_with_keep_points.coords_point__fill_colour =  "rgba( 250, 180,0, 0.75 )";


		// ---- GIVE IT SOME NICE COORDINATES 
		new_settings_object_with_keep_points.latitude_and_longitude_positions = out_points;

		// ----- ---- and save it 
		this.settings_n_data_objects_array.push( new_settings_object_with_keep_points );


		// ---- feedback
		console.log("---- ok, done, so that NO-intersection action ( overlap ) took "+( new Date() - starttime)+" ms - got "+new_settings_object_with_keep_points.latitude_and_longitude_positions.length+" points ( original grid was "+object_points_KEEP.latitude_and_longitude_positions.length+" points" );
	}




	// ----- fetch grid coords object from external data! ----



	// load data and do callback 
	this.load_external_coords_data__create_settings_object_with_this__part_one = function( url_to_external_coords_data, this_ ){
		console.log(">>>> load_external_coords_data__create_settings_object_with_this__part_one() - loading data : |"+url_to_external_coords_data+"|" );

		this_.loaded_data = -1;

		var local_this_ = this_;

		fetch( url_to_external_coords_data )
			.then( function( response ){
				return response.json();
			})
			.then( function( myJson ){
				console.log("--- got json data! saving locally… ");
				this_.loaded_data = myJson;

				local_this_.load_external_coords_data__create_settings_object_with_this__PART_TWO( this_.loaded_data, local_this_ );
			});

	}

	


	// after the data is loaded … do this : set up a settings obj and give it the data… 
	this.load_external_coords_data__create_settings_object_with_this__PART_TWO = function( json_data_as_json, local_this_ ){
		console.log(">>>> load_external_coords_data__create_settings_object_with_this__PART_TWO() - got json data of length "+json_data_as_json.length );

		// --- create settings object
		local_this_.settings_n_data_objects_array.push( new local_this_.settings_and_data_obj() );
		var curr_settings_obj_i = local_this_.settings_n_data_objects_array.length -1 ;

		// convert coords to the right format 
		// var converted_coords__now_in_settings_obj_lat_lon_format = this.convert__lat_lon_tuple__to__setings_obj_latitude_and_longitude_positions_format( json_data_as_json );
		var converted_coords__now_in_settings_obj_lat_lon_format = local_this_.convert__lat_lon_tuple__to__setings_obj_latitude_and_longitude_positions_format( json_data_as_json );

		// - give it the coords 
		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].latitude_and_longitude_positions = converted_coords__now_in_settings_obj_lat_lon_format;

		// - give it a relevant free text explanation 
		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].free_text_description_of_object = "coords object created from EXTERNAL DATA"; 

		// - set it's drawing qualities 
		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__width_px_x = 8;
		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__height_px_y = 8; 
		// set some nice colours 
		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__fill_colour =  "rgba( 250, 180,0, 0.75 )";

		// add the current object to the rendering que 
		local_this_.rendering__indicies_of_settings_objects_to_draw__as_array.push( curr_settings_obj_i );

		
		console.log("||||| that's it! we created a nice new settings object at settings objects index |"+curr_settings_obj_i+"|" );
		console.log("\t |||| and it's got "+local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].latitude_and_longitude_positions.length+" coord points! ");
		console.log(" |||||   -- FINISHED ---- ")
	}





	// load data and do callback 
	this.load_external_coords_data__AND_OTHER_METADATA__create_settings_object_with_this__PART_ONE = function( url_to_external_coords_data, this_ ){
		console.log(">>>> load_external_coords_data__AND_OTHER_METADATA__create_settings_object_with_this__PART_ONE() - loading data : |"+url_to_external_coords_data+"|" );

		this_.loaded_data = -1;

		var local_this_ = this_;

		fetch( url_to_external_coords_data )
			.then( function( response ){
				return response.json();
			})
			.then( function( myJson ){
				console.log("--- got json data! saving locally… ");
				this_.loaded_data = myJson;

				local_this_.load_external_coords_data__AND_OTHER_METADATA__create_settings_object_with_this__PART_TWO( this_.loaded_data, local_this_ );
			});

	}



	// after the data is loaded … do this : set up a settings obj and give it the data… 
	this.load_external_coords_data__AND_OTHER_METADATA__create_settings_object_with_this__PART_TWO = function( json_data_as_json, local_this_ ){
		console.log(">>>> load_external_coords_data__AND_OTHER_METADATA__create_settings_object_with_this__PART_TWO() - got json data of length "+json_data_as_json['coordinates'].length );

		// --- create settings object
		local_this_.settings_n_data_objects_array.push( new local_this_.settings_and_data_obj() );
		var curr_settings_obj_i = local_this_.settings_n_data_objects_array.length -1 ;

		// convert coords to the right format 
		// var converted_coords__now_in_settings_obj_lat_lon_format = this.convert__lat_lon_tuple__to__setings_obj_latitude_and_longitude_positions_format( json_data_as_json );
		var converted_coords__now_in_settings_obj_lat_lon_format = local_this_.convert__lat_lon_tuple__to__setings_obj_latitude_and_longitude_positions_format( json_data_as_json['coordinates'] );

		// - give it the coords 
		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].latitude_and_longitude_positions = converted_coords__now_in_settings_obj_lat_lon_format;



		// ----- add the mata deta settings 

		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].free_text_description_of_object = json_data_as_json[ 'other_settings_obj_metadata' ]['free_text_description_of_object'];

		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].current__what_kind_of_geometry_object = json_data_as_json[ 'other_settings_obj_metadata' ]['current__what_kind_of_geometry_object'];

		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].what_kind_of_points_layout = json_data_as_json[ 'other_settings_obj_metadata' ]['what_kind_of_points_layout'];

		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].points__global_subdivision__gridsize_latitude_y__in_km = json_data_as_json[ 'other_settings_obj_metadata' ]['points__global_subdivision__gridsize_latitude_y__in_km'];

		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].points__global_subdivision__gridsize_longitude_x__in_km = json_data_as_json[ 'other_settings_obj_metadata' ]['points__global_subdivision__gridsize_longitude_x__in_km'];

		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].geo_limits__global__left_longitude_limit__as_decimal__from_left_to_right = json_data_as_json[ 'other_settings_obj_metadata' ]['geo_limits__global__left_longitude_limit__as_decimal__from_left_to_right'];

		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].geo_limits__global__right_longitude_limit__as_decimal__from_left_to_right = json_data_as_json[ 'other_settings_obj_metadata' ]['geo_limits__global__right_longitude_limit__as_decimal__from_left_to_right'];

		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].geo_limits__global__top_latitude_limit__as_decimal__from_top_to_bottom = json_data_as_json[ 'other_settings_obj_metadata' ]['geo_limits__global__top_latitude_limit__as_decimal__from_top_to_bottom'];

		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].geo_limits__global__bottom_latitude_limit__as_decimal__from_top_to_bottom = json_data_as_json[ 'other_settings_obj_metadata' ]['geo_limits__global__bottom_latitude_limit__as_decimal__from_top_to_bottom'];

		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__width_px_x = json_data_as_json[ 'other_settings_obj_metadata' ]['coords_point__width_px_x'];

		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__height_px_y = json_data_as_json[ 'other_settings_obj_metadata' ]['coords_point__height_px_y'];

		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].coords_point__fill_colour = json_data_as_json[ 'other_settings_obj_metadata' ]['coords_point__fill_colour'];


		// -- and add a prefix text, that the data has been loaded 
		local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].free_text_description_of_object = "coords object created from EXTERNAL DATA : " + local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].free_text_description_of_object;


		// ------ render me? 

		// add the current object index to the que of things to render 
		local_this_.rendering__indicies_of_settings_objects_to_draw__as_array.push( curr_settings_obj_i );

		
		console.log("||||| that's it! we created a nice new settings object at settings objects index |"+curr_settings_obj_i+"|" );
		console.log("\t |||| and it's got "+local_this_.settings_n_data_objects_array[ curr_settings_obj_i ].latitude_and_longitude_positions.length+" coord points! ");
		console.log(" |||||   -- FINISHED ---- ")
	}	


	// ----- Get sensor and low res grid coords, put them in settings objects, and visualise them 
	//		(version two of this - now with more final coords - both sensor and low res surrounding grid in one file ) 
	//			 get it as onlnie data, as you want to visualise things and thus run it from a browser


	this.fetch_and_create_settings_obj_from_sensor_and_surrounding_low_res_grid_coordinates_file__PART_ONE_of_TWO = function( local_this_ ){
		console.log("\n>>>> fetch_and_create_settings_obj_from_sensor_and_surrounding_low_res_grid_coordinates_file__PART_ONE_of_TWO() ");

		var local_this_ = local_this_ ; 
		var starttime = new Date();

		console.log("\t --- url : |"+local_this_.url_to_external_sensor_grid_and_surrounding_low_res_grid_INPUT_file+"|" );


		// fetch data 
		fetch( local_this_.url_to_external_sensor_grid_and_surrounding_low_res_grid_INPUT_file )
			.then( function( response ){
				return response.json();
			})
			.then( function( myJson ){

				// assign locally 
				local_this_.fetched_sensor_locs_and_low_res_surrounding_grid_coords = myJson;
				
				// feedback 
				console.log("\t --- oho! got JSON! size : higher_res_sensor_grid/lower_res_surrounding_grid length "+local_this_.fetched_sensor_locs_and_low_res_surrounding_grid_coords['higher_res_sensor_grid'].length+"/ "+local_this_.fetched_sensor_locs_and_low_res_surrounding_grid_coords['lower_res_surrounding_grid'].length );
				console.log("\t || all this in "+( new Date() - starttime )+" ms");

				// go to the next level 
				local_this_.fetch_and_create_settings_obj_from_sensor_and_surrounding_low_res_grid_coordinates_file__PART_TWO_of_TWO( local_this_ );			
			});
	}


	this.fetch_and_create_settings_obj_from_sensor_and_surrounding_low_res_grid_coordinates_file__PART_TWO_of_TWO = function( local_this_ ){
		console.log(">>>> fetch_and_create_settings_obj_from_sensor_and_surrounding_low_res_grid_coordinates_file__PART_TWO_of_TWO() ");

		var starttime = new Date();

		console.log("\t --- PART TWO OF TWO :oho! got JSON! size : higher_res_sensor_grid/lower_res_surrounding_grid length "+local_this_.fetched_sensor_locs_and_low_res_surrounding_grid_coords['higher_res_sensor_grid'].length+"/ "+local_this_.fetched_sensor_locs_and_low_res_surrounding_grid_coords['lower_res_surrounding_grid'].length );

		// for later 
		// var sensor_coords_settings_obj_index = -1;
		var surrounding_low_res_coords_settings_obj_index = -1;


		// -------- set up new settings objects and assign things appropriately

		// --- SET UP OBJECT FOR SENSOR COORDS  --- 

		// - make object
		local_this_.settings_n_data_objects_array.push( new local_this_.settings_and_data_obj() );

		// - get index 
		var sensor_coords_settings_obj_index = local_this_.settings_n_data_objects_array.length -1;

		console.log("\t --- working on the sensor cords setitings obj - it's got index position #"+sensor_coords_settings_obj_index );

		// add index to the rendering array 
		local_this_.rendering__indicies_of_settings_objects_to_draw__as_array.push( sensor_coords_settings_obj_index );

		// - add a description 
		local_this_.settings_n_data_objects_array[ sensor_coords_settings_obj_index ].free_text_description_of_object = "generated sensor grid coords - ";

		// - add some nice points 
		local_this_.settings_n_data_objects_array[ sensor_coords_settings_obj_index ].latitude_and_longitude_positions = local_this_.convert__lat_lon_tuple__to__setings_obj_latitude_and_longitude_positions_format( local_this_.fetched_sensor_locs_and_low_res_surrounding_grid_coords['higher_res_sensor_grid'] );

		// - change point size ?
		local_this_.settings_n_data_objects_array[ sensor_coords_settings_obj_index ].coords_point__width_px_x = 8;
		local_this_.settings_n_data_objects_array[ sensor_coords_settings_obj_index ].coords_point__height_px_y = 8;

		// -  and colour? 
		local_this_.settings_n_data_objects_array[ sensor_coords_settings_obj_index ].coords_point__fill_colour = "rgba( 255, 0, 0, 0.5 )";

		// COLOUR FOR THE NEXT OBJECT 
		// - "rgba( 250, 180,0, 0.75 )";



		// --- SET UP OBJECT FOR SENSOR COORDS  --- 


		// - make object
		local_this_.settings_n_data_objects_array.push( new local_this_.settings_and_data_obj() );

		// - get index 
		var low_res_surrounding_grid_settings_obj_index = local_this_.settings_n_data_objects_array.length -1;

		console.log("\t --- working on the next settings obj - the one with the low res grid - it's got index position #"+low_res_surrounding_grid_settings_obj_index );

		// add index to the rendering array 
		local_this_.rendering__indicies_of_settings_objects_to_draw__as_array.push( low_res_surrounding_grid_settings_obj_index );

		// - add a description 
		local_this_.settings_n_data_objects_array[ low_res_surrounding_grid_settings_obj_index ].free_text_description_of_object = "generated low res surrounding grid";

		// - add some nice points 
		local_this_.settings_n_data_objects_array[ low_res_surrounding_grid_settings_obj_index ].latitude_and_longitude_positions = local_this_.convert__lat_lon_tuple__to__setings_obj_latitude_and_longitude_positions_format( local_this_.fetched_sensor_locs_and_low_res_surrounding_grid_coords['lower_res_surrounding_grid'] );

		// - change point size ?
		local_this_.settings_n_data_objects_array[ low_res_surrounding_grid_settings_obj_index ].coords_point__width_px_x = 8;
		local_this_.settings_n_data_objects_array[ low_res_surrounding_grid_settings_obj_index ].coords_point__height_px_y = 8;

		// -  and colour? 
		local_this_.settings_n_data_objects_array[ low_res_surrounding_grid_settings_obj_index ].coords_point__fill_colour = "rgba( 250, 180,0, 0.75 )";


 
		// ---- finalising? 

		console.log("|||| DONE retrieving external sensor and low res grid coords, adding them as settings objects and also to the rendering que. All done in "+( new Date() - starttime )+" ms ");
		console.log("\t |||| got settings objects with grid/low res "+local_this_.settings_n_data_objects_array[ sensor_coords_settings_obj_index ].latitude_and_longitude_positions.length+"/"+local_this_.settings_n_data_objects_array[ low_res_surrounding_grid_settings_obj_index ].latitude_and_longitude_positions.length+" num of points ");


		// - recycle/empty variables? 

		local_this_.fetched_sensor_locs_and_low_res_surrounding_grid_coords['higher_res_sensor_grid'] = -1;
		local_this_.fetched_sensor_locs_and_low_res_surrounding_grid_coords['lower_res_surrounding_grid'] = -1;

	}




	// ------- geo conversion 


	// CONVERT array from : 
	//		 [lat, long] postions 
	// to :
	// 		 { "lat_angle_as_coord_sys_degrees" : 0, "long_angle_as_coord_sys_degrees" : 1 }

	this.convert__lat_lon_tuple__to__setings_obj_latitude_and_longitude_positions_format = function( in_data ){
		console.log("\n >>>> convert__lat_lon_tuple__to__setings_obj_latitude_and_longitude_positions_format() of indata of length "+in_data.length );

		var starttime = new Date();

		// localise for speed 
		var indata = in_data;

		var outdata = []

		// loop and convert 
		for( var i = 0; i < indata.length; i++ ){

			outdata.push( { "lat_angle_as_coord_sys_degrees" : indata[ i ][0], "long_angle_as_coord_sys_degrees" : indata[ i ][1] } );
		}

		console.log("||||  ok - done converting "+outdata.length+" elements :) ");

		return outdata
	}


	// -- INVERSION OF THE ABOVE 
	// CONVERT array from : 
	// 		 { "lat_angle_as_coord_sys_degrees" : 0, "long_angle_as_coord_sys_degrees" : 1 } 
	// to :
	//		 [lat, long] postions

	this.convert__setings_obj_latitude_and_longitude_positions_format_array__to__lat_lon_tuple_array = function( in_data ){
		console.log(">>>> convert__setings_obj_latitude_and_longitude_positions_format_array__to__lat_lon_tuple_array() ");

		var starttime = new Date();

		var out_data = [];

		// loop and convert 
		for( var curr_i = 0; curr_i < in_data.length; curr_i++ ){

			out_data.push( [ in_data[curr_i]['lat_angle_as_coord_sys_degrees'], in_data[curr_i]['long_angle_as_coord_sys_degrees']   ]  );
		}

		// feedback and end 
		console.log("|||| converted data to [lat,long] in "+( new Date() - starttime )+" ms ");

		return out_data;
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
        	var dot_loc = info.layer._map.latLngToContainerPoint( [ curr_lat, curr_long ] );

        	// console.log("\t --- curr position : (coords/px) "+curr_lat+","+curr_long+" / "+dot_loc.x+","+dot_loc.y );

			canvas_context.fillRect( dot_loc.x, dot_loc.y, coords_point_width, coords_point_height );
			// canvas_context.fillRect( dot_loc.x, dot_loc.y, pixel_size_given_zoom_level, pixel_size_given_zoom_level );
        }

        // fin
        console.log("--- simple_drawing_function___coords_gen_obj - drawing loop took |"+( new Date() - starttime )+"| ms ");
	}



	// NEW VERSION OF THE DRaWING ALGORITHM, with array input of which 
	// settings object to draw

	this.simple_drawing_function___coords_gen_obj__NEW = function( canvas_context, main_this, local_this, draw_layer_this, info ){
		console.log(">>>> simple_drawing_function___coords_gen_obj() - drawing the following setings objects : "+draw_layer_this.rendering__indicies_of_settings_objects_to_draw__as_array );

		var starttime = new Date();

        //// and then try plotting some coordinate points :) 

        // loop through the suggested settings objects and draw them
        for( var curr_settings_objs_to_draw__indicies_i = 0; curr_settings_objs_to_draw__indicies_i < draw_layer_this.rendering__indicies_of_settings_objects_to_draw__as_array.length; curr_settings_objs_to_draw__indicies_i++ ){

        	// get curr settings obj index
        	var curr_setings_obj_num = draw_layer_this.rendering__indicies_of_settings_objects_to_draw__as_array[ curr_settings_objs_to_draw__indicies_i ];
        	console.log("-- now drawing settings obj # "+curr_setings_obj_num );

        	// get curr settings obj 
        	var curr_settings_obj = draw_layer_this.settings_n_data_objects_array[ curr_setings_obj_num ];

	        console.log( "--- draw_layer_this.settings_n_data_objects_array.length : "+draw_layer_this.settings_n_data_objects_array.length );
	        console.log( "--- curr_settings_obj.latitude_and_longitude_positions.length : "+curr_settings_obj.latitude_and_longitude_positions.length );
	        console.log( "--- curr_settings_obj.latitude_and_longitude_positions[0] : "+curr_settings_obj.latitude_and_longitude_positions[0] );
	        console.log( "--- curr_settings_obj.latitude_and_longitude_positions[1] lat/long degrees : "+curr_settings_obj.latitude_and_longitude_positions[1]['lat_angle_as_coord_sys_degrees']+"/"+curr_settings_obj.latitude_and_longitude_positions[1]['long_angle_as_coord_sys_degrees'] );


	        // set fill colour 
	        canvas_context.fillStyle = curr_settings_obj.coords_point__fill_colour;
	        //// canvas_context.fillStyle = "red";
	        // - copy values locally 
	        var coords_point_width = curr_settings_obj.coords_point__width_px_x;
	        var coords_point_height = curr_settings_obj.coords_point__height_px_y;

	        // or… 
	        // var pixel_size_given_zoom_level = ( 1** ( ( map.getZoom() - 2 )/120 ) )+2 ;

	        // loop and draw
	        // for( var curr_pt_i = 0; curr_pt_i < curr_settings_obj.latitude_and_longitude_positions.length; curr_pt_i++ ){
	    	// NOTE THE SMALLER AMOUNT OF POINTS ( thanks to the += 1000 hop )
	    	for( var curr_pt_i = 0; curr_pt_i < curr_settings_obj.latitude_and_longitude_positions.length; curr_pt_i += 1 ){

	    		// console.log("\n --- simple_drawing_function___coords_gen_obj : working on point # "+curr_pt_i );

	        	var curr_lat = curr_settings_obj.latitude_and_longitude_positions[curr_pt_i]['lat_angle_as_coord_sys_degrees'];
	        	var curr_long = curr_settings_obj.latitude_and_longitude_positions[curr_pt_i]['long_angle_as_coord_sys_degrees'];

	        	// var dot_loc = info.layer._map.latLngToContainerPoint( [ curr_lat, curr_long ] );
	        	var dot_loc = info.layer._map.latLngToContainerPoint( [ curr_lat, curr_long ] );

	        	// console.log("\t --- curr position : (coords/px) "+curr_lat+","+curr_long+" / "+dot_loc.x+","+dot_loc.y );

				canvas_context.fillRect( dot_loc.x, dot_loc.y, coords_point_width, coords_point_height );
				// canvas_context.fillRect( dot_loc.x, dot_loc.y, pixel_size_given_zoom_level, pixel_size_given_zoom_level );
	        }

	    }

        console.log("--- simple_drawing_function___coords_gen_obj - drawing loop took |"+( new Date() - starttime )+"| ms ");
	}


	// ------------- time operations  --------------


    this.generate_date_as_year_month_day_string = function( in_date_object ){

        console.log("\n>>> generate_date_as_year_month_day_string() of in_date : |"+in_date_object+"|" );

           // - fetch consitutent parts of a date 
        var year_in_input = in_date_object.getFullYear();
        var month_in_input = in_date_object.getMonth();
        var month_in_input = in_date_object.getMonth()+1;
        var day_in_input = in_date_object.getDate();

        // - build url 
        var date_as_year_month_day_string = year_in_input+"-"+month_in_input+"-"+day_in_input;

        console.log("\t --- got date string : |"+date_as_year_month_day_string+"| from input date |"+in_date_object+"|" );

        return date_as_year_month_day_string;                     
    }



    // // - generate a valid url based on the givne date object 
    //

    this.generate_url_for_data_from_date_object = function( in_date_object ){

        console.log("\n>>> generate_url_for_data_from_date_object : generateing url from date obejct : |"+in_date_object+"|");

        // - build url 
        out_url = "http://sourisr.kapsi.fi/luftdaten/luftDaten_data_explorations/ld_daten_various/tabular_ld_data__480_s_intervals/24_hrs_pm_data__starting_from__"+this.generate_date_as_year_month_day_string( in_date_object )+".json";

        console.log("\t --- generated url |"+out_url+" from input date |"+in_date_object+"|");

        return out_url;
    }


    // - get yesterday's date :) 
    this.get_yesterdays_date_obj = function(){
    	console.log(">>>> get_yesterdays_date_obj() ");

    	var today = new Date();
    	var yesterdays_date = new Date( today.setDate( today.getDate() -1 ) );

    	return yesterdays_date;
    }


    this.get_yesterdays_date__as_YYMMDD_url_string = function(){
    	console.log(">>>> get_yesterdays_date__as_YYMMDD_url_string() ");

    	return this.generate_url_for_data_from_date_object(  this.get_yesterdays_date_obj()  );

    }


	// ------------- NODE JS  --------------


	this.load_nodejs_fs_library = function(){
		console.log("---- load_nodejs_fs_library() ");

		this.fs = require('fs');
	}



	this.write_text_file__with__given_text__and__url__with_node = function( given_txt, out_url ){
		console.log(">>>> write_text_file__with__given_text__and__url__with_node()");
		console.log("\t --- text length : "+given_txt.length+" chrs ");
		console.log("\t --- url : |"+out_url+"|" );

		// for timing 
		var starttime = new Date();

		// load relevant library 
		// this.load_nodejs_fs_library();
		var fs = require('fs');

		fs.writeFile( out_url, given_txt, function(err) {
		    if (err) {
		    	console.log(" :( :( :( --- ERROR SAVING! ");
		        console.log(err);
		    }
		    else{
		    	console.log("|||| done saving, hopefully… in time "+(new Date() - starttime)+" ms ");
		    }
		});

	}



	// ------------- node js (TESTS) --------------



	this.write_text_with_node = function(){
		console.log("\n >>>> write_text_with_node() ");

		var starttime = new Date();

		// this.load_nodejs_fs_library();
		var fs = require('fs');

		this.make_new_TEST_settings_n_data_obj__with_global_subdivision();

		console.log("\t --- made new settings object with some coordinates  ");

		this.json_str = JSON.stringify( this.settings_n_data_objects_array[0].latitude_and_longitude_positions );

		console.log("\t --- got json string of length "+this.json_str.length );

		fs.writeFile( "test_json_output_from_nodejs_01.txt", this.json_str, function(err) {
		    if (err) {
		        console.log(err);
		    }
		    else{
		    	console.log("|||| FIlE SAVE : done saving, hopefully… in time "+(new Date() - starttime)+" ms ");
		    }
		});

	}



	this.write_text_with_node__with_coords_in_small_latLong_formatted_array = function(){
		console.log(">>>> write_text_with_node() ");

		var starttime = new Date();

		this.load_nodejs_fs_library();

		this.make_new_TEST_settings_n_data_obj__with_global_subdivision();

		console.log("\t --- made new settings object with some coordinates  ");

		this.json_str = JSON.stringify( this.convert__setings_obj_latitude_and_longitude_positions_format_array__to__lat_lon_tuple_array( this.settings_n_data_objects_array[0].latitude_and_longitude_positions ) );

		console.log("\t --- got json string of length "+this.json_str.length );

		fs.writeFile( "test_json_output_from_nodejs_01.txt", this.json_str, function(err) {
		    if (err) {
		        console.log(err);
		    }
		    else{
		    	console.log("|||| done saving, hopefully… in time "+(new Date() - starttime)+" ms ");
		    }
		});

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

		this.points__global_subdivision__gridsize_latitude_y__in_km = 50;
		this.points__global_subdivision__gridsize_longitude_x__in_km = 50;

		this.points__screen_subdivision__gridsize_horizontal_x__in_px = 50;
		this.points__screen_subdivision__gridsize_vertical_y__in_px = 50;



		// --- geo-limits 

		// -- for global subdivision 

		// latitude x  
		this.geo_limits__global__left_longitude_limit__as_decimal__from_left_to_right = 0.0;
		this.geo_limits__global__right_longitude_limit__as_decimal__from_left_to_right = 1;


		//  longitude y 
		this.geo_limits__global__top_latitude_limit__as_decimal__from_top_to_bottom = 0.1;
		this.geo_limits__global__bottom_latitude_limit__as_decimal__from_top_to_bottom = 0.81;


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

/*
		// -- set the kind of grid construction we're looking at 

		this.set_using_global_subdivision = function(){

			console.log(">>>> set_using_global_subdivision() ");

			this.what_kind_of_points_layout = this.what_kind_of_points_layout__preset__global_subdivision ;			
		}
*/

	}



	// --------------  constructor

	this.print_input();	

	// // TEST 
	// this.make_new_TEST_settings_n_data_obj__with_global_subdivision();

}





//////// RUNME !

console.log(">>>> running <<< ");

var calc_cords_obj = new Calc_coords();
calc_cords_obj.TEST__make_settings_objects__save_to_external_file__PART_ONE_of_two();

console.log("|||| DONE! ");



