
 t  notes XML forecast files span and timing visualisation 
( started 20190731 )


##### 20190731 TO DO

- set variables : 
	- time intervals for lines … 

- make a function : to turn timedates into epoch times in seconds 
- make a funciton : get the distance in pixels given : 
					- starttime
					- endtime 
					- pixels per seconds  

- make timings lines 

- make time guide-lines 
	** make this into a function, so you 
		can make several of these, at different time 
		frequencies  ** 

	- make the vertical lines 
		++ add the text markers for the time lines… 
			- need : 
					- interval 
					- startpoint in s  ( left time-point of window )
					- endpoint in s 



##### 20190802 TO DO 

- Fix the vertical height calculation of the chart

- Fix visualisation… 

- Fix mouseovers?  

- Maybe add visuals showing the temporal distance between the forecast beginnings … 




##### 20190803 TO DO 

- Status : We have the visualisation of the timings. 

- To do now… 


	- ANSWER THE KIND NORWEGIANS 
		- thanks for the kind answers
		- when is a good time to do the calls, if the models are updated twice daily? 
		- what my next steps will be 
		- I'll tell them when I've done something . 


/.
9;l	- WHEN DO WE DO MORE VISUALISTIOSN
	- Good question… 
		- Think of visualisations to make
			- time series data for individual or group sensors
			- do small multiples for select locations?!



	- Figure out when a good time to save data might be… ? 
		- look at the graphs according to when they're updated ( and try figure out how much improbability you want to have).
		- eg you don't want to call the api about the same cooridnate, during the same forecast run ( and get the same forecast data )



	- Figure out WHICH DATA TO FETCH AND FROM WHERE: 
		- Considerations : 

							- WHAT DATA :
								- Data kind : 
									- Do we fetch humidity, and, wind + wind temp direction?
									- likely yes, if it's not too difficult.

							- HOW TO FETCH DATA - SAME FOR HUMIDITY AND WIND DIRECTION/SPEED ? 
								- Humidity is needed WHILE Wind direcion is a nice add-on. 
									- Do we FETCH them in the same way? 
									- Do we STORE them in the same way? 
										- likely storing them in the same way will make it easier to retrieve them. 
											- the API is the same… 
										- ( also, as the api is the same, it could make sense to have asimilar operation for storing them )
									¿? !! HOW MUCH STORAGE WILL DATA TAKE?! 
										- For storage, and for sending to the client. 
											- there needs to be some kind of limit. 
												- of course, if wind data is an optinoal add-on, then it's not that difficult. 

							- FROM WHERE : 
								- Only from around current sensors?
									+ less data to fetch
									+ could allow for more finely grained data
									- needs occasional sensor loc lookup
									- would be difficul to make an airflow simulation with limited numbers of sample points

								- Fetch a world grid of sensor data? 
									- could take abit more time
									- could take more storage
									+ no need for as much lookups and optimisations of what to fetch
									+ all the data will be there. 
									¿ What kind of a grid? 
									¿ Figure out which areas on land and which aren't. 




	- Figure out a good way TO STORE THE DATA
		- Considrations : 
			- do we store humidity and wind direction in the same way?
			- storage space
			- compliated data structure ( stored )
			- ease of retrieval
			- suitability of stored data model to retrieval… 
				( - idea : store 24 hour data files, and if the file for 'today's forecast isn't available, use the previous days' file, as it might have forecasts for the next days… )




- Random small to-do things : 
	- find a js and python library that converts between coordinate systems. 
	- PLAN AHEAD! 
		- Think of what you can do in 15 - 30 minutes… 
		( Maybe you can make the first plan before you arrive in a cafe, so you at last have that… )
		( maybe also try planning ahead for the day, roughtly … )

	- WHEN DO WE DO MORE VISUALISTION?S



##### 20190811 TO DO : 

- MAKE VISUALISTION OF COORDINATE POINTS :

	- ADD SUGGESTED COORDINATE POINTS TO THE CURRENT LD TIME-VISUALSATION

		- So, in a few more words : 

			- Make an addon to the current visualsiation - a separate JS file. 
				?! Check how to trigger it.


			- Generate coordinates : 
				- According to the globe sub-division we've played with earlier. 
				( remember to convert the found coordinates to 'normal' corrdinates )
				- According to pixels on the screen, using leaflet to fetch the coords. 


			- Show in the visualisation. 
				- Migh need somem changes to the visualistion. 


			- Have tools in the visualisation to : 
				- show how many points there are on the map.
				- select areas and show how many points there are in that area.
					- and tools to export the coords in this area - cropping coords and resulting coords.
					( could be a round-about way of selecting land areas… )




			- PSEUDO PSEUDO CODE : 
				- generate coords : 
					- coords gen object : with settings objects that also have the generated coordinates. 

						( ¿ What functions should a coords object have ? 
								- generate coords
								- method of generating coords 
								¿ compare coords with locations of sensors? 
									- produce some statistics regarding this.
										- average, nearest, longest distance from sensor to humidity sampling point 



#####  20190817

- VISUALISE GRIDPOINTS?!

	- Current architecture
		- event handler, of the layer, of the event .drawlayer()
			catches event and execues drawing command.
			- Generates its own canvas context of the info.convas… 
			… which is a canvas dom element… maybe added by the canvas leaflet map library
			- here's a look that goes through the points, gets the curent lat/lon 
				and convers the lat/lon to screen coordinates.
			- canvas ctx.fillrect to do the drawing…


	- Potential solutions
		- Give the points a colour! 
			- in the main script… 
			- in the coords gen library?
			- in the maps drawing command … 
		- Add a stack of things to draw… 	
			- with on/off switches
		- Just add it to the current drawing command << maybe a bit messy 


		- more specific about implementation
			- add an array of drawing functions to the main script.
				- add an on/off switch - add them drawing commannd as array with on/off switches
				- thus an external script could add their own entry to the 
				list of things to draw, if it just gets a reference to the 
				main object. ss
			- the external drawing command is passed the local settings?/contect
			( imporantly : the canvas context )
				- maybe also the external library's own context
					( eg so it could access the data )

			¿! Howto decide which data the drawing command, of an external library, 
				should draw?
					¿ what might be the different scenarios for the points plotting?
						- show different reslutino grids?
						- show connections between grids?s
						- select points… ?!s

			- how to specifically plot gridpoints?
				- remember : give them different clours depending on what they should do




			- QUICK SUMMARY OF TRAIN THOUGHTS : 
				- In the main object ( current ld visualiser ):
					- array of functions that do the drawing
						- including ( as below ) links to drawing functions
						in other objects, like the grid points generating object
				- In the draw handler :
					- go through and execute the drawing commands mentioned
					above. be sure to pass the relevant contexts ( super and local )
				- In eg the drawing function of the coords gen object : 
					- set your own order and functionality of drawing.
						- eg. if you need to draw different laywers, selectively, 
						then it's easeier to enable that in the drawing object
						drawing function, than first defining and then later turning on/off drawing layers in the main object.
					- eg, in the coords gen object, have an array of different layers that could be drawn, and draw them yes/no, depending on settings. 
						- maybe each settings object could call to be drawn? 
							- could have its own visual settings

					- should the coords gen object have a separate drawing object? ( or would this in fact the the drawing function called by the main handler? )?
						+ Pro : 
							+ this could separate out the drawing 
						- Con : 
							- would in the end make for a lot of objects. 
							- ¿ do we have a separate object for each feature? 
							OR should the drawing functionality be a central part of the main object? 
								- this depends on how extensible we want to make things. 
								- how do we work with other things needing drawing : 
										- process of selecting things
										- time series data
										- different visualisations of the PM ( and other ) data?!
										- ( again, visualise the gathered points data )



				- VARIOUS RANDOM NOTES : 
						- the drawing of the coords doens't need to be final or very polished, IT'S MAINLY ABOUT VISUALISING THE POINTS, SO WE CAN CHECK THE POINTS CREATION.
						APPROACHES : 
							- sketch minimal and maximal time needed for this.
							- set a time-limit for how long to spend on this.
							( - keep track of how much time is spent on planning and actual production ). 



				- WHAT DOES A MINIMAL IMPLEMENTATION LOOK LIKE? 
						- add the draw functions array in the main object . 
						- add an array of settings objects to draw in the coords gen object.
							( - and each settings object should have its own visual style.
								- maybe also different rendering styles. eg the time of fetching points could look different than a regular points grid display  ). 
							- give the coords gen object a drawing function ( along the lines above : first basic, then also with some variations .)


				- IN A WIDER PERSPECTIVE, what's needed, in terms of drawing and interface interaction : 
						- the drawing units should be modularised. 
						- likewise the screen elements. 
						- HOWEVER > screen elements might need to work in tandem with one another, so think about how to enable different screen elements to interact with one another. 
							- could it be that : 
									- different drawing objects 'own' different parts of the screen, different event handlers, at different times. ( eg when something covers the screen, that object ows the handler…?! )
									¿ Could this be solved by different dom objects SIMPLY owning the events that happen within their space? 
										- Think of examples of when this is true 
										and when it is not. 
											- EXAMPLES of when different visual elements or control elements might be in conflict : 
												- Different visualisation controls : 
													- when a control for grid visualisation is open at the same time as different visualisation modes for the PM data; and/or shop positions, wind visualisations. 
														- Possible solutions : 
															- Make it only possible to activate different modes ( eg visualisation ) one at a time.
															- Write special rules as to how things are 'allowed' to interact. 
															- ( do a bit of both … )
															- along the lines of do-a-bit-of-both: Consider the balance between having strict rule-sets á la active-one-at-a-time vs special rules. 
															¿ How modular do things need to be? 
																- does the strict rules requied to automate modularity in fact hinder functionality?
																- can one have strict rules most the time and have exceptions at times? ( ie build in the possibility to do exceptions. … providing the complexity doesn't become too great )




##### 20190821 

	- Current : 
		- have implemented a quick version of the drawing of generated coords. 
			- noting : I've mixed up lattude and longitude. 
				even if latitude spans horisontally, when asking about latitude, 
				people typically refer to y coords. 
				and thus, longitude even though it spans vertically, is a measure of x coords

	- Future needs : 

		- Speculative to-do : 
			- Timing of planning which to get, getting, preparing and serving humdiity data.

		- More immediate to-dos : 
			- do we rebuild the coord generating code to switch the x/y more clearly? 
			- for comparing the generated coords with the sensor locations, 
			we need a way of getting the sensor locations. 
				- we can do this by getting the current data in the visualiser.
				// YES YES YES. IT SHOULD BE ENOUGH. One can always query some older day's data for
				more complete ( eg full 24 hours of data )
				- or we could read a csv file with the coords, generated on the server. THOUGHT - is maybe this not what we already have? 

		- (slightly) more immediate to-dos : 
			- main question : We need to : 
										- Get the generated grid points take are close to sensors.
											- get count :) 
										- ( For lower resolution grids covering areas that are outside of the sensor areas ):
											- Only take the grid points from one set of coordinates, that are not within a certain distance of a different sets gridpoints. 
												!!! ERGHMMM… sounds like a similar operation, 
												though the format of the grid poins might be different, between generated grid points, and sensor points.
												- ¿ Make a translation function? 
										¿! Make a new kind of object for storing the intersecing 
											coordinates in? 
												- also consider that it should be good for visualising
												data in… 


		- Long term to-dos : 
			- How to figure out scheduling and timing of the coordinates fetching 
			and assembling? 
				- MAYBE THIS IS VERY MUCH A LATER THING. 




		- Slight attempt a t asummary of what's needed next. 

			- Check the LAT/LONG X/Y PROBLEM ( should be laty and lonx )

			- LOOK OVER THE VISUALISATION SYSTEM on the coords generating object.
				- check if it is clear enough for visualising different grids, 
				  AND the intersection grid results. 

			- Look at how to do the coordinate intersections.
				- How to do them. math wise
				- How to work with different data formats - eg sensor points and generated grids.
					- Make method to convert the sensor coords into generated grid coords format. 
						( at least so the two have the same hash index name/text - eg 
								"lat_angle_as_coord_sys_degrees",
								"long_angle_as_coord_sys_degrees" )
				- How to save the intersections : 
					- as another grid coords object ( aka "settings_and_data_obj" )
						- YES : remember to set "the current__what_kind_of_geometry_object" setting appropiately. 


					- PSEUDO CODE : 
						- How to do an intersection with generated grid points and sensor points. 
							-- such that one gets the generated grids coords with sensors in them.

							- General algorithm : 
								- in coords :
											-  generated coords
											-  sensor coords
								- out_coords = []

								- loop through all the generated grid points. 	
									- loop though all the sensor coords
										- if the snesor is close enough to the grid coord ( do a box search - THOUGH A RADIUS SEARCH COULD BE MORE EFFICIENT): 
											- save the grid coord as a relevant one. 


						-- How to compare two grids and only get the grid points from the one grid that are not close to the grid points of a different grid? 
							- as above but : 
								- for each grid point of desired grid : 
									- loop through all points of the grid one wants to avoid : 
										- compare distances
											- at the end of looping through all points of grid to avoid, 
											 	if no 'intersection' has been found, add the point of 
											 	the desired grid to the list of "OK" points. 

						-- Combine the coordinates? 
							- 
							- for drawing : better to draw them separately? 

						- NOTE : 
							- While the above code produces only one set of out points per function, 
							it can be good to keep things separate, as you'll need to ask for the sensor-near points more of often than the other grid points. 




##### 20190822 

	- To do : Make functino that takes two settings objects, with coordinates, 
		and takes :
					- only the coordinates from one object ( eg grid object )
					that are within X km radius from the other object's grid points ( eg sensor locations )
					
					- as above, but only the coordinates ( eg lower res grid points ) that are not 
					within X km radius of any grid point in the other object ( eg sensor locs ) 
					are kept. 


		- Common for both operations : 
				- need to know the km distance per degree, at given latitude ( y )

				- which radius to use, for within-distance? 
					- likely also a product of the radius distances mentioned below. 

				-- HOW TO FIX : 
						- either look up the distance at every latitude … 
						- look it up only once per latitude ( make a running lookup table )
			>>>			- use the given settings object to make a looup table. 
							- eg. generate all the latitude ( y ) points and the distance per kilometer for each 
							- AND, if the latitude point doesn't exist, make a lookup entry for that one :) 
						- as above, but use a random high res count of latitude points, for which to do this at. 
						( in the even there might be some rounding error issue when making the points again. )

					- hmmm… 

		- Pseudocode : 
			- 



##### 20190823 

	- Problem :
		- Lat Long mixup. 
			- when calculating distances, you get some angles ( ideally laty ) that span 180° and others that span ( ideall longx ) 380°. But they're mixed up. 

		- Solution? 
			- Make sure you save earlier versions!
				- Save new version!
			- Go to points gen algorithm and try reverse the naming, so latY and longX .
				- Check the various assumptions, etc… 


			- REMEMBER : you've switched LONG/LAT in the drawing algorithm! 
							- put it back in the order it's supposed to be in. 

				- ( REMEMBER (lesser edition) ) : CHECK : that the various other distance calculation algotherms still work… 
					- the max distance generator is a bit questionable… 




##### 20190902 
	
	- How to continue? 

		- Let's recap needs ; 
			- Correct humidity : 
				- need : 
					- humidity data to browser
					- compile humdity data 
					- store humidity data
					- gather humidity data
					- figure out which humidity data is needed 


		- How to move on?

			- Let’s overview and think ( going from higher to lower level goals ) 

					- Goal : humidity data to browser
						- still not quite there yet  …
				
					- Goal : compile humdity data 
						- still not quite there yet  …

						- ¿ run when ?
							- at set intervals a day … regardless of points gathering has
							finished or not.

						- do what ? 
							- seek the coords in the latest relevant list of points. 
								- ¿ what to do if they don't exist? 
									- look for the relevant point from the previous round of gathering?
										- providing the forecast data for that exists… 
										( DO MARK WHETHER THE FORECAST DATA IS OLD… good to show in the visualisation )
									- 
						- DATA FORMAT : 
							- Gather only data for the latest forecast? 
								( use case : people won't check other bits than the latest )
							- Gather data for the period since midnight. 
								( could be useful to do this, as humidity data correction
									is a bit of an add-on in any event… )
							- Gather data as an add-on for sensors. 
								- make an hourly series of data for each sensor, 
									based on the closest humidity data points for each sensor.
										- only 24 values per sensor. 
								- OR : LESS DATA, LIKELY, make a file for the sensor-near 
										grid points! : currently 780 or so with a 50km grid ( or so )
										… with the current day's + some extra overlap hours values. 
										( ths file cal be updated throughou the day, as new data arrives  )
									- WE CAN ADD THE WIND DATA, and the surrounding 
										grid points, later… 
											… with some optimisation to save space… ! 

				
					- Goal : store humidity data
						- still not quite there yet  …
						- SEE BELOW 
				
					- Goal : gather humidity data
						- ideas : 
							- save info about which sensors locations have been gathered? 
							( see below )

				
					- Goal : how to store and update info about locations needing gathering? 
						- run the script for building location listing, 1-4 times a day? 
							- script runs and builds two lists : 
								- near sensor locs locs
								- other grid locs ( eg for wind and future data … )

							- lists stored in database… ( in case the server goes offline for a bit)
								- each row : timestamp as to which day/period that the coordinate
								is for. 
									- also a column as to whether the data has been fetched ( optional : timestamp when the data was fetched )

							- script to gather points, runs every * times a day. 
								- at start : goes through the list of points to gather :
									- gathers points, marks the given point as retrieved. 
									- continues until the points are retrieved. 

							( ¿ how to make sure the script has run? 
									- run the script every hour, and check wheter all points have been gathered? 
									- run the script at times that are likely not to be interrupted by other things like resets - eg at midnight … )



					- Goal : figure out which humidity data is needed 
						- in progress : 
							- just [need] to get the system running properly. ie : 
								- figure out whether to run python or javascript… 
								- figure out how to avoid asking for too many points to be gathered : 
									- figure out a gridsize that avoids too many points being gathered? 
										- figure out worst case scenario with sensor expansions… 
										- set low other-grid resolution?





				- Summary : 

						
							- as an optional choice? 

					- Goal : compile humdity data for sending 
							- store it per measurement coordinate, in a similar way as the PM data. 
							- store the near-sensor humidity data separate from the additional grid locations, separately. 
								- for faster lookups? 
							- OPTIONAL : 
								- lookup the nearest humidity sampling points to each sensor location. 
									( well, maybe this is a bit too much to ask for, every 8 minutes when the PM data is assembled… 
										- of course, one could inverse it : 
											- per humidity coordinate : 
												- list the nearest, within a certain radius, sensor ids. 
											              - after data loading : 
	      											                       - assign each sensor ( id ) the number of which humidity coordinate/data is closest ). 
		

					- Goal : store humidity data
								- ????? 

					- Goal : gather humidity data for sending to browser: 

						- midnight-now ( and later until the next update of data ) 
							- sql the relevant time-period : 
								- do as with the PM data…  



					- Goal : how to store and update info about locations needing gathering? 

							- run gathering script as many times as is convenient, given how long it takes 
							- As noted below : 
								-  EG 1 or 2 times a day, for runs not lasting more than 2-3 hours each. 

							- How to store : 
								- 1 row per location : 
									- array with 0-30 hour forecast values
										( good to store 30 hours, in case the next days’ file isn’t posted… ) 
									- array with 30-48 hour forecast values 
										- if, later, the coordinate wasn’t fetched, and one needs historic data… 
									- timestamp when the coordinate was fetched
										( to help retrieve it later ) 
										- or, for optimisation : 
											- simple date timestamp
											- simple time of day timestamp ; to check which time in the day the coordinate was fetched

							- For midnight-current : 
								- Per coordinate : 
									- gather closest data to current time. 
										- eg. group coordinates : sort data by time : 
											- paste in old data, paste new data over: 
												- thus the old data, which isn’t in the new data, is there. And the new data, fresher than in the old file, is also there.
											- resample the data every now and again, and put into new database with the latest versions of the data. 
												- when new data comes in : make single row entries for the coordinate loc and time in the data. 
										- that way there’s one entry per hour and coordinate loc. 
												       - WRITE OVER OLD DATA! for the same times! 


							- TO DO TO GET FURTHER : 

									- to do : Store data in a form that’s easy to retrieve : 
											- how? 
												- approach A :   
												       	- Store coordinate @ hour separately .
																- pro  : it’s easier to access the different times, and possibly update them with future data. 
																- con : it’s more overhead for psql to do this. 

												- approach B. : 
														- Store one entry per retrieved coordinate : and 48 hours of forecast time. 
																- pro  : fewer things for psql to gather at one time. 
																- con : more things to unpick for pandas ; maybe not so optimised database with arrays etc… ;
																		more dealings with accurate time… 


					- Goal : figure out which humidity data is needed :

							- figure out som max/min amount of coords,
							based on how long it takes to gather the coords, 
							and that the server should be doing other things during the same time too! 
					                 ( also consider that the predictions expire at some point… 
								- EG 1 or 2 times a day, for runs not lasting more than 2-3 hours each. 

							- Eg maybe figure out some way of gathering coordinates that leaves 
							some time for doing other things. 
							( also optimise the gathering, so it doesn’t unneccessarily tie up the computer constantly ). 

								- for additional locations : take measurements from ‘balloon’ed regions’ from sensors. 
								eg. do find-locations-near-sensors but set the find-radius to quite far away. 
									- then intersect the balooned sensors away from the higher-resolution sensor grid locations 
										- thus you’ll have : 
												- separated locations in high/low resolution
												- separated locations 


								- Notes : 
										- Could be good to do some speed testing, to see how things actually work out in reality… 

								- References. :
										- joins documentation : 
												- 
										- update documentation : 
												- https://www.postgresql.org/docs/9.5/sql-update.html
												- http://www.postgresqltutorial.com/postgresql-update-join/
												- https://www.tutorialspoint.com/postgresql/postgresql_update_query.htm 
												- http://www.postgresqltutorial.com/postgresql-update/
										- psql arrays documentation : 
												- https://www.postgresql.org/docs/11/arrays.html
												- https://www.tutorialspoint.com/postgresql/postgresql_data_types.htm
												- 


				- Notes : 
						- gathering additional points, also for wind direction, is good for : future ( historic data ) needs 
						- question : consider relation between spatial detail, speed of retrieval, and forecast accuracy. 
										-  could be a good idea to have lower resolution but more up to date forecast data…
											( but then one needs assembling eg current day ( or historical) data from several copies of the same coordinate: 
												- ideally with data from the ‘closest’ time forecasts to the needed time in the data. ( argh… this will be complex ). 
												- Several times a day : compile the current day file from the data. 
												- At end of day : compile the most accurate data from the previous day. 






###### 20190904 : 
	
	- To do : 
		- see if you can make the coordinates finding run in node. :) 


	- TO DO NEXT : 
		- Complete the function generating and saving the grid cords to be fetched … 
			- ie : 
				- generate the current day filename for the file fetch … 
				( hint : aside from being online : that file is likely on the same server as the script will run on… ) 
				- check whether you’re creating a permanent variable somewhere it shouldn’t be. 
				- set up the relevant objects and do the relevant intersecting… 
				- export coordinates! ( [lat, lon] array is fine : :) 
					- in two separate files… 
				- process.exit()! 
	
		- How to compile a longer list of sensors? 
			Ie if the sensor list fetched when the script runs - eg 0100 - doesn’t have all the sesnors of the last 24 hours. 
			 - idea : 
				- Load the data files of “today” and “yesterday” and fetch the unique sensor locs from these.

				- Pseudo code: 
					- generate todays and yesterdays dates + urls 
					- fetch both 
					- generate unique list of urls 


##### 20190907 

	- To do : 
				- check if this works : 
						- fetch_and_create_settings_obj_from_sensor_and_surrounding_low_res_grid_coordinates_file__PART_ONE_of_TWO




##### 20190910 

	- Summarise what has been done and what to do next.

		- What we have done : 
			- Have built code that generates the coordinates that we should gather, for measuring the humidity. 
			- Can be run regulaly. 
	
		- What do we want to do overall?
			- Show humidity irregularities.
			- Assemble coordinates for fetching relevant humidity values from met.no.
			- Fetch coordinates.
			- Store them properly. 
			- Retrieve them
			- Assemble and send them to the browser properly. 
			- Retrieve them from the browser.
			- Use the humidity data to do a correction of the PM values.

		- What to do *next* ? 
			- Fetch coordinates. IE : 
				- store the coordinates in a database table.
					- with the ’session info’ about when it was stored, also whether it’s a sensor-near or peripheral location ).
							- ( so it can be retrieved easily later, when getting around to fetching the data ).
							- ( also good for marking which coordinates have been fetched. 
							- ( as there’ll be continuously new coordinate maps ) 

							- DATABASE COLUMNS ( for listing coords to gather ) : 
								- For each coordinate : 
									- Lat - ( Float ) 
									- Long - ( Float ) 
									- Sensor or Low res coord ( binary ) - yes/no == sensor / low res coord.
									- Daily session ID ( Int ) - which time of day was it created ( for retrieval of the latest generated coords )
									- Timestamp ( at least one could get the date from there easily ) 
									- Fetched ( binary )             

							- Pseudocode for inserting coordinates data into DB table : 
								- initialise
								- read coordinates data ( json file ) 
								- go coordinate by coordinate, 
									- parse
									- insert
								- do some quick feedback
									- seek inserted coords in db ( remember starttime ) 
									- write number of inserted coords to file. 


				- run script to systematically gather the coordinates. IE : 
					- do/fetch sensor coordinates first and then later the low res coords.
					- fetch the list of relevant coords, to fetch, from the database table above.
						- figure out how to specify which set of coordinates we’re fetching. 
								- make a list of times that the coordinates should be fetched
								- figure out which the last one was 
									- ( subtract relevant times, to make this work. ) 
								- make a sql request of the time interval between :
									- the time that the fetching was supposed to begin at. 
									- ¿ the current time.
									- ¿ starttime + 2 hours? 
									- ¿ btw last fetch starttime and next fetch starttime.
						- go coordinate by coordinate and fetch the data. 
							- fetch data and separate out the different forecast hours. 
								- store them separately, along with data about when the saving was done. 
								- upon storing all the coords in the (forecast) database table, mark them as saved 
									in the db table with the coords list.

							- MAKE TWO TABLES! 
								- one for sensor coords, one for low res coords! 
							- DATABASE COLUMNS ( for gathered weather data ) : 
								- For each coordinate : 
									- forecast time ( according to data ) 
									- Lat - ( Float ) 
									- Long - ( Float ) 
									- Sensor or Low res coord ( binary ) - yes/no == sensor / low res coord.
									- Daily session ID ( Int ) - which time of day was it created ( for retrieval of the latest generated coords )
									- Timestamp ( ( of saving)  at least one could get the date from there easily ) 
									> SENSOR VALUES <
									- temperature - real 
									- windDirection - real 
									- windSpeed - real 
									- humidity - real 
									- pressure - real 


						- DATABASE COLUMNS 
					- at the end of fetching the coords > check that you’ve got them all. 
						- look through the list of coordinates and check whether they have all been marked as fetched.
							- if they’re not all fetched.
								- fetch them again? 
								- use old ones? 
								- publish humidity values with old forecasts, until new ones have been fetched.
								- SET A TIMEOUT FOR RE-FETCHIGN VALUES! 
									- OR AT LEAST A DEADLINE.
				
					


##### 2019-09-14 Update : 

	- Working on : 
		- fetching and inserting environmental data into dB 
			- NOTE ; use two separate tables for the different data ( sensor / low res grid ). 
			
		- To do : 
			- make sure the code in Jupyter Notebook is also in the main code :) 
			- build database tables 
			- figure out how to deal with the different sessions the code could be working on 
				- this affects : 
					- which generated coordinates data the code fetches
					- which saving env-data session it is marked as working on, when writing to db. 




##### 2019-09-19

	- That fetch data-from-met-no algorithm… 
	
		- PSEUDO CODE for the coordinates fetching … 

			- Determine current time & session id
				- use the method to figure out which session ID we need.
				- Generate relevant psql search string 
					- fetch unfetched coordinates: 
							- … in the event that the server shut down while fetching the met.no coords.
			- Fetch relevant generated coords
				- That haven’t been fetched in this session yet.
					- How to do this when fetching the same coords later in the day?
						- well, each new daily session comes with newly generated coordinates.
							- so, at the beginning of a session, all coordinates are UNfetched.
							- and if the script restarts after a server crash, then it’l know which coords haven’t been fetched.
							- AND, well, in most cases the script will be updating existing coords, 
							fetched earlier, with newer info.
			- Fetch the generated coords
				- Generate query, and send. 
				( - remember : update the coordinates that have already been fetched, for this time. eg the coordinates from the time of the earliest time in the just-fetched forecast, and 24/48 hours forwards in time. 
			- Parse the fetched data
				- info different hourly entities. 
			- Store each in db
				- you have most the code for this already… except the part of saving to a temp table. 
				- try saving the generated hourly measurement rows, for each row, in a temp table, 
					and run a update/join operation between the two, once all the coords have entered the temp db. 
			- Finish. 
				- double-check if all cords have been saved.
				- … ask the next script to run. 
					- ( or do we simply schedule the data-assembly script to run, at given times,
						regardless of whether the fetch coords script is finished? 


		- NOTES : 
	
			- Look into storing the list of times to generate and fetch coordinates,
				as a json file somewhere, so both generate-coords and fetch-coords-data scripts
				can read the same timing info. 
					- EG. Write the info in text in the generate script, and write it to a file from there too. 

			¿ For updating coords : 
					- do we do the updates continuously, or do we wait until we have more points and do joins bit after bit? 
						-> WELL <- if one does a join for every 24/48 hours ( ie one coordinate ) then it is a bit of a 
						time-saving thing. Especially if adds the 24/48 coord samples info one a temporary table, 
						and does a join/update with that. < END > 

			¿ How to check whether all the coords have been fetched? 
				- ie. if one suspects that a script, say, fetching coords, has crashed while fetching coords, 
				should one re-run the script regularly, and check that all the coords have been fetched?  
	


###### 2019-09-24 

	- Testing updating the met data. 



##### 209-09-28 
	
	Status : 
		- Upsert seems to be workig. 
			Should be tested by running it several times a day. 
			- it looks like the data is updated at : 
				- 0230
				- 0830
				- 1430
				- 2030 
		- SOLUTION? 
			- This tip as some good ideas for running cron jobs at specific times
			( solution : you could make a cron job that runs at given hours and minutes in those hours ) 
			https://stackoverflow.com/questions/35574603/run-cron-job-everyday-at-specific-time


	To do ( to run things several times a day  ) : 
		- ( set up a triggering sequence so all the code runs, eg one after another ).
		- Add the relevant hours to the timing data. 
		- Make sure the hours are shared appropriately. 
		- Run the code at these hours ; 
			- ( AT FIRST : only generate new coords once, so the same coords are fetched. 
								- it’s easier to test if things have been updated, 
								when one deals with the same coordinates  ) 

				- run update list of coords and dates to fech
				- run the coords fetch . 
	
		- Then CHECK THE DATA : 
				- eg. look at : 
								- has the data been updated? 
									( you could try taking ‘snapshots’ of the data, and compare it over time ).

	To do: 
		- Think about how to compile the data for the browser. 
			- as previously? 

		- Think about needs ! 
			- need to see which areas have high humidity  
				- show as overlay? 
			- could be good to help sensors figure out which he nearest humidity areas are…
				- if we want to do a numeric assessment of sensor accuracy … 
				( even if we do this lookup in the browser, it would only need to be done once… ) 

		- Also think about : 
			- How to send the data to the browser. 
				- Truncate coords and what-not… 
				- add a list of nearest sensors/humidity points, to the … list of sensor ids…?! 
						or next to the list of humidity points… 



###### 2019-09-30

	- How to put things in motion: 
		- gather sensor locations, generate coordinates, add them to db,  fetch coordinates. 
	
		- schedule things…  
			! maybe check the data as to when the api files are update
			
		- look at what’s needed in the different scripts : 
			- generate coords 
				- maybe gather the sensor coords from the local disk? 
			- put generated coords in db : 
				- check about timing … 
				- archive cords as csv every now and again? - and remove cords from db… 
			- fetch coords : 
				- make self-running ( ie run script and do fetch? ) 
				- clean up? 
				- clean db every now and again? 

		- general : 
			- check that a nodejs script can trigger a python script
				- and that a python script can trigger another python scrip 

			- add sys.exit() ? 



		- PART TWO : ( 2019-10-01 ) 
			- how to check the results? 

				- check the output when the script has run : 
					- times : 
						- (utc) 1340
							- yes coords - 4400 
						- (utc) 1415
							- yes coords - 4400 
						- (utc) 1440 
							- yes coords - 4400 
						- (utc) 1505
							- yes coords - 4400 

					- what output? 
						- check that the coordinates have been generated 
						- check the amount of fetched coords that have been generated in that time… 
						- check the amount of different fetching sessions for a day ?! 
							-> maybe this works better when the runs are run at the times when 
								

		- PRE next-step : 
				- make another test run : 
					- add the times of the test run into the timing data … 
						- so the psql coords search finds the coords! 
						- try starting at 0840 utc
							-

				- how to check output : 
						- check coords 
						- check met data 
							- find the number of rows produced 

		- NEXT PART - part one : 

				- Run things today again: 
		
					( 1511 local time now - ie 1311 utc) 
					- 25 mins per session. 
					- times : 
						- 1330 
						- 1355
						- 1420
						- 1445
					
		- NEXT PART - part one pt five : 
				- How to write a script that automatically checks the output of the coords gen / coords fetch?
					¿ what do we want to know ? 
						- coords gen : 	
							- how many coords were generated 
						- coords insert : 
							- how many coords were inserted in a given session
						- coords fetch : 
							- how many of the timestamps for the next 24 hours, were generated within a 
								certain time-slot. 
							- how many of the rows were modified within a time-session 
							- distinct time-fetching ids within a time-period. 

		- NEXT STEP - TWO  : 
				- make the scripts run at the time the air data is updated… 
				- add the coordinates generation, to run automatically.


		- TO LEARN : 
				- datetime? 




###### 2019-09-30


	- Make a script ( that runs periodically ) and generates statistics on what’s been updated in the DB 

		- Pseudo-code 
			- for each time-segment : 
				- generate psql search string 
					- get relevant times! 
						- NOTE : if the time slot is the first or last, the previous / next time shift, 
							- if currslot = last : 
								- the next time is the same as the first slot, but 24 hours later. 
							- if currslow = first : 
								- the previous slot is the same time as the last slot, but 24 hours earlier. 

		- Pseudo-code TWO : higher level : 
			- generate report : 
				- do sql queries for all the matters you want ( see above ) . 
					- get timestamps for the start/end of the search periods! 
						- loop through the time slots and add the search periods as strings … 





###### 2019-10-11

	- Next up : Gather data &&  Send it to the browser && Display it 

		- Quick ideas on the different themes : 


				=== Gather humidity ( and wind, etc ) data from data?! 
					- What time to include? 
						— data saving mode : for ‘today’ data : as w the senor data : midnight-> next update? 
							- yes, make the file midnight -> next update + 1 hour 
								- include meta-data about the timing 
						— ‘data free’ mode : midnight -> as long as the time we have? 
							-> why? 
						— remember : do make the 24 hour files :) 
											- can be made at midnight, when there’s data for the whole period in the db . 



				=== Send it to browser ( when? formats )
					- Compression? 
						- of humidity data
						&& lookup of which humidity points are nearest which nearest sensors is? 
							- figure this out! 
								- Might be something that needs to be done every data update : as the sensor count could 
									change with every update… or is it then better to do it on the browser? 
					- What kind of format to use? 
						> (roughly) Same as for the sensor data? <
						- same as for the settings obj? 
						- * new settings obj format? * 
						¿ >-What’s the overall idea for external data-< ?
							¿ what kind of external data could we have ?
								- PM 
								- Humidity, wind 
								- Ship/Plane location + other value 
							! In sum : 
								> The json model works well, especially if one has a different array for 
									time, and the different values we want to track. <
									- If there’s s a custom interpreter and renderer of the data, then it works
									to have multiple different data sources. 
										- There can be different renderers in the rendering pipeline, for 
										different data objects. 
										! HOWEVER, can be good to standardise on different things, like
										time, time duration and location. that way the items in the data can be 
										easier to interpret. 
						- Formatting : in more detail : 
								- do it in 1 hr steps. 
								- fill in blanks in the data? 
									- as with the PM data! 
									( SEE IF YOU CAN REMAKE THE DB -> TIMESERIES JSON DATA in a more
									beautiful way, one that is more modular for different kinds of data sources 
										( like wind… ) ) 
								> use one character per value? <
									- 0->10 or alphanumeric encoding. 
								> shorten geographic locations! <

	
				=== Use it : Display it, etc… 
					- Interfacing : 
						- Include it as an option one can turn on? 
						- Include it by default? 
							- Could help first-time users… who don’t know about humidity problems. 
								- Do bivariate colour scale. 
					- Options : 
						- Show overlays on top of map, indicating humidity
							- Creates some problems with sensors that are beyond the reach of the humidity sample points.
								- SOLUTION? : Also include low res grid overlay? 




		Part TWO : 2019-10-13 : 
				-- How to go about this practically : 
					- Gathering PM DATA : 
						- Look at the previous data-gathering-code, from the regular PM data, 
						and see how can collate the data. 
							- REMEMBER: 
								- WE might need several measurements ( eg wind speed and dir, possibly temperature and pressure ) 
								( yeah, then consider how to avoid sending the coords list of the sensors several times… 
									… save in separate file? … fetch separately ? ) 
					
					- Nearest humidity points to sensors? 
						- How to gather this data?
							- ¿ Define what you need.…
								- No need for distances to low res grid sensors, as those will be an exception rather than rule. 
								- Gather all the sensors within X radius of humidity point, into list? 
									( question of which is the most relevant…  already shortening the 
										list of humidity points to seek distances to, is a help.
										! BUT it could be quite intensive to calculate interpolations between humdity point values
										for each PM sensor, for each frame update. So just pick the nearest humidity pt, 
										rather than interpolate. ) 
										( yeah, and learn web-workers : ) 
									- save near sensors with each humidity coord?
									- or save nearby humidity points to sensor coord?
										(  avoid doing square root dist calculation? - just sum dx/dy? ) 
									


##### 2019-10-21

	- Status : 
		- Keep working on the gather->resample->save code… 

		- Recap : 
			- key? : how to save data? 
				- make a numpy array with the same number of dimensions as the number of 
				columns to save… 
				- when resampling data, loop through the factors 

			- NOTE! 
				- make sure the metadata has the same names for the columns,
				as the columns have in the database … 



	- Part TWO ( 2019-10-23 ):
		- working on resampling: 
			- about how long the files should be… 
				- remember to consider when the predictions are made, and how long data you need. 
				( eg. maybe for midnight->now, you might need the data until the next hour… as you don’t have data
						up to the minute ) 

			- REMEMBER : 
				- check whether the sql query fetches the latest hour? 
					 - ie is it timestamp <= end_timestamp  ( and not just < ) 


			- REMEMBER : 
				- CHECK that we have all the timestamps in the resampled data! 

			- TO DO : 
				- Try resampling all columns, in different orders! 


	- Part TWO ( 2019-10-24 ) 

		- Status
			- resampling : semi-done :
					- consider interpolating missing values! 
						- also in the original humidity data
							- check here : 
							     https://stackoverflow.com/questions/47148446/pandas-resample-interpolate-is-producing-nans
			- collecting data for saving : partly done
					- optimise the data output?
						- do we have too many decimal points? 
							- eg : 
								- winddirection 	
								- windspeed
								- temperature 
								- pressure 
								- humidity 
					- check if your file format is like the visualisation apps file formats! 
						- ie naming
						- eg is the data formatting the same? 
					- do more testing!
			- saving to file : done
			- saving to server : not done 
				- also remember to figure out the right path! 

			- ALSO : coords generation? 
				- run this automatically! 
				- and getting a sensors nearest measuring points?
					- or how do we actually change the visuals of sensors?
						- do overlay over sensors?
						- change the colour of sensors 
							( they could just swap colour scale when they’re in areas of high humidity ) 
								- do lookup? 
									- do parallel 1/0 array, of humidity values ( ie 1 if over threshold ) 
									( find closest measuring point to sensor, if within certain radius .
										if not within radius, suggest which sensors are the closest. 
											….but not if they’re beyond a certain distance.  )
					- (coords gen) Question : 
							- what happens when one gets a new coord later in the day, 
							and no humidity data for it… 
								- or said in a different way, how is it to show humidity data for a location,
									when the point only came up during half the day? 
										-> do the same as for PM points? 
												i.e. show nothing… 

					- How to test automatic coords generation? 
						- let it run… 
							¿ how to check the output? 
								- 
									
			- And then getting data into the browser : 
					- re-make the data storage, and system architecture generally…  ;
						- separate the visualisation ( rendering ), data holder, and adjustment layers ( which can also modify data ) 

						- storage:
							- save in a similar format as the existing data; 
							( the idea of having different data resolutions, was/is good. ) 

						- adjustment layers? 

						- renderers? 
							- got : OO to call different renderers already … 
							( give them some more properties, like knowing which data to use… ) 
							- how to render humidity? 
								- an option to the current PM renderer? 
									- could involve a lot of lookups… 

					- what about getting the location of the nearest sensor? 


			- Overall considerations : 
				- do sensor grid and low res grid? 			
					- you could test gradually, with only the sensor grid, and see how it works. 
						- potential problems with the ‘gradualism’? : 	
							- the save-coords ( and find nearest sensor), save data, and resample code isn’t adequately developed 
							to handle the low res grid data. 


			

		PART THREE ( aside from the above ) :

				- Daily schedule : 
						- check through the whole stack wheher it’s ready for sensor and low res grids generation
						… and associated input/output :

							- sensor_grid_creation : ready 
							- adding_current_gen_coords_to_db : ready ( but check the output please : )
							- fetch_met_no_api_coords_weather_data__add_it_to_db : not ready …
									// fetch list of coords to be fetched 
									// - only fetches sensor grid coords for now 
									- check what the coords_to_fetch_met_data_from_01 db table allows for coords distinguishing
											- column : sensor_or_low_res_pt? 
									// inserting coords into the different database tables 
									// - it’s almost there : the “UPSERT_fetched_met_no_api_coord_into_db” function 
									// 	there are arguments space for running sensor/low res grid things 
									//    but the db execute statement doesn’t allow for changing db tables… 
									
									// updating which coords have been fetched : 
										- the updating the coords list, as to whether a coord has been fetched, 
										doesn’t allow for indicating low res coords have been fetched.

									// PROBLEM : 
										- if the XML is garbled, things crash! 
											- find a way of excepting this. 


							- gather_resample_and_save_met_data_to_csv : ??? 



		( PART FOUR - simple to-do 2019.11.02 ) :

				- Check that our fetch code is doing what it should be 
					- check that the number of coordinates in the data ( lat lon combinations ) 
					correspond to that in the number points generated.
					- check that the number of api hourly values correspond to the the num of coords x 24… 
					- how to check on periodicity? 
						- well, check that the number of values in each period are what they should be … 
				- Check that the gather_resample_save code is compatible with low res grid things
				- Make sure you back up your code! 
					- compress and download? 

				( Try run the coords generation thing periodically, and save the different maps… ) 

				( - fetch password from catalyst2 … ) 
				( done : check when knapek.org/miska.org expire ) 
					 >> 2020.02 <<



##### 2019-11-19

	- Status : 
		- Looking at how to include humidity data in the LD viewer. 
			- data loading and data access is one of the larger issues… 





##### 2019-11-22

	- Status : 
		( - ( hopefully also: ) - thinking about the ideal code design. … ) 
		- adding data holding object, as an interim solution to the existing LD viewing code… 
			- to do : 
				- check how the current code works and make something appropriate… 
				- add some meta-data to the renderer selection, so the data handlers can know 
					whether the selected renderers need the given data item’s data. 
					- do check how different renderers might be selected! 
					- adding the meta-data to the renderer que could also help identify them when un/selecting them.
					— NOTE : the adjustment layer has a renderer called “simple_drawing_function___coords_gen_obj__NEW”
				- add data holding object(s). 
		

	- 2019-11-25
		- working on the OO data holder object(s): 
			- to-do : 
				- make general master data holder object.
				- make general time series data holder object 
				- make specific PM and Humidity data holder objects 

		

			- data holder model : 
				data holder main object :
				{ 
						- various variables :
									- (eg) data :
										{
												- data_kind(s) ( eg PM data ) 
												- methods : 
													- check avail data for given day
													- load data for given day 
													- parse data for give day 
													( and the same for longer time periods ) 
															- data resolutions ( eg. 480s )
															{

																// please note the variables in each sampling length 
																// data. Each of these will be slightly different. 	
																- data <- yes, actually :) 
																- various parameters : 
																		- number of samples per day
																		- timestamps … 
															}
										}
									
						- various methods :
				}


			- mapping timing object? 
				? Do we have a universal time-indicators/clocks? 
					- likely not, or at least only once. 
						|—> different elements might have different time settings 
								( - eg. a long time series graph/widget might have a start and end point,
											- while the current visualisation only ‘needs’ one time… 



			- questions : 
					- where to put functions to check if data at given resolution and time/date are available? 
							- options : 
								1. - put in specific data kind holder :  use data about resolution and date to check avail data.
										+ central 
										+ less syntax to go through when asking to check for avail data… 
											( though, well, while calling the method is easy, the method has more complexity ). 
										- need to make sure the syntax is correct - some more settings to get right
	
								2. - put the methods by the data : at the data resolution level : 
										+ might mean more memory needed ( though, maybe not that much… )
										+ less syntax to get right ( well, one doesn’t need to get the resolution right, only the date ) 
										- maybe more complicated in loading data - so many layers to go through… 
												… when calling for more data… 
					- how to design the data loading function for having multiple demands : 
							- eg. having one ‘user’ asking for a specific day, 
									AND having another ‘user’ asking for a specific time period? 
						\—> have different settings or different functions all together. 
							


			- notes : 
				- could be worth thinking of to structure the data in light of un/serialis’ing it (data) in urls, later… 



##### 2019-12-01

	- Status : 
		- been working on data request objects, with info about what data is being requested
		
	- Needed : 
		- in master data holding obj : 
			- in rendering obj : make function to go through renderers and request data about what data is needed. 
					- 
			- make a function that checks for overlaps in data request objects
					 ( in master data holder? <<— yes, as that’s where the data is ) 
			- make function to check/load data ! ( in master data holding obj ) 

	- 2019-12-02 : 
		- check this object comparison function : 
			dedupliacte__data_objects_about_what_data_to_fetch



	- Part TWO : 2019-12-05 : 
		- fix the deduplicating algorithm. 
			- if one runs the test twice, then i doesn’t find the duplicates… 
				… probably some indexing error somewhere.


	- Part THREE : 2019-12-09
			- Where are we again? 
				
			- Plan : 
				- Check where we are: 
					- Error checking the testing and deduplication of data request meta-data objects
						- Check the creation of test data
						- Check the deduplication work 
				- How to move ahead : 
					- Main aim ( reminder ) : 	
						- it’s about loading relevant data 
					- (next) Mini goals : 
						- 

	- Part FOUR : 2019-12-13

		- DO : 
			- work on check/load 

				- CHECK / LOAD loop: 

					- ready_to_proceed_to_render = true;
					- for each data_request_meta_data_obj : 
						- check if data exists. 
							- if yes, return true
							- if no,  return false
								- it not loading : start loading daa
								- set loading tag to true
								- set ready_to_proceed_to_render = false;

					- end of loop : if ready_to_proceed_to_render === true : 
											- proceed to render frame
									it ready_to_proceed_to_render === false : 
											- do nothing. 
												- data will be loaded and the the check/load function will be called again 



		- QUESTION : 

			- How to handle data loading? 
				¿ - Does the data request metadata object handle it?
							- it asks the relevant data holder to load the data. 
							( - loading flag is set )
								- the callback updates the loading flag 
							\- summary : 
										- the modularity is good here. 
											- it means the data request renderer, making the data request objects,
											 doesn't need to have the loading and parsing code for the data it requests.
											 The particular data holder holding the data, has code to load and parse it. 
				¿ - Does the data handler handle it, upon request from the data request object? 
						- 

				\-> one conclusion : 
					- it's easier to track requests if the loading status info is in the data request meta-data obj .


			- Design of data request object in regards to specific data holding objects : 
					- data_request_metadata_obj : has a loading flag. 
						- asks relevant data holder to check if data is present : 
							- if yes : 


			- PSEUDO CODE : in master data handler : 

					- set variable checking if any data is missing : eg : 
						do_we_have_all_data = true;
					( only set this to false, not to true, when querying the data request objects for missing daat  )

					- for each data request meta data object : 

						- ask : is_necessary_data_in_place() ? 

						- data request meta-data obj : 

							- asks the relevant data holding object, whether the data is in place 

								- relevant data loading object ( which is passed a reference to the data request metadata object ):	
									- checks 
										- if no data : 
											- sets data request meta data .loading flag to true 
											- starts loading data 
												- callback : 
													- data processing;
														- STORING PROPERLY, with the relevant formatting and setup!
													- indicate in the meta-data object that the data is loaded! 
													- call the check/load function again 
											- returns false
										- if yes data : 
											- returns true
											- sets data request meta data obj .is_fetched = true 

					- at end of data request metadata object checking : 
						- if is_any_data_missing === false : 
							- don't do anything. wait for the callbacks loading data 
						- else ( data is in place ) : 
							- go ahead and render frame…! 

				- NOTE : relevant functions : 
					- check_if_data_is_avail__load_data_if_missing__callback_when_loaded()
						- check_if_data_is_avail__load_data_if_missing__callback_when_loaded() 


			- NOTE : data arrangement : 
				- master data holder : 
					- different kinds of data : 
						- time resolutions 
							- timedata : 
								\- data 


			- 2019-12-16 : - BUG IN CHECKING WHETHER RELEVANT TIME RESOLUTION IS PRESENT! 
								- temporary fix

			- 2019-12-24 :   MADE LOADING WORK IN PRINCIPLE : NEED TO FILL IN TEMPORARY BITS! 
								- got the loading working, in principle, 
								  WITHOUT data processing and storing .

							- To do next : 
								- detail what's missing, here
								- detail above, in the plans, what needs to be done.

								- What's missing : 
									- Create new entity to hold data ( eg in master_data_holdr/kinds_of_data/relevant_data_kind/time_resolution/relevant_datetime )
									- Process the data, as previously, and store it. 
									( - try not store the data temporarily as windows.data_something )

									- UPDATE RENDERER TO USE NEW DATA…
									- MAKE HUMDIITY DATA …adaptation, for data and rendering


							- To do next, part TWO : 
								- detail current workings of handling incoming data : 
										- main loading function : 
											-- check_if_date_available__and_load_and_setup_if_needed() 
											// note : the json response is made into the relevant data object .
											//			ie no transformation of the incoming data : it's simply stored directly, according to its timedate 
											//			code : 
											//					days_data_holder[ current_dateTime__as_YY_MM_DD_string ] = response_json;
											// note 2 : this would need to be updated for the new data holding structure
										- subsequent functions : 						
											-- parse_loaded_data_into_something_visualisation_friendly( current_dateTime__as_YY_MM_DD_string ) 				
														//	- basically rearranges the incoming data into a format that requires fewer lookups 
														//	- also sets the number of sensors 
											-- calculate_number_of_sample_periods_FOR_THE_WHOLE_DAY___in_current_days_data__WHETHER_OR_NOT_THE_WHOLE_DAYS_DATA_IS_THERE() 
														// 	- as the name suggests 
											-- make_all_timestamps__OBJECT_ORIENTED_VERSION( relevant_day_as_YY_MM_DD_string ) 
														// (later) NOTE : originally this function made OO timestamps for the current day AS A SYSTEM WIDE VARIABLE
														//					EACH TIME A NEW DAY WAS LOADED. 
														//					THIS TIME IT WOULD BE BETTER TO STORE THE TIMESTAMPS WITH THE DATA, 
														//					and not generate them anew every time.
														// note : the relevant_day_as_YY_MM_DD_string variable is used to find the data, where it's stored 
														//		    this would need to be updated for the new data storage solution 
											-- THEN BASIC SCREEN UPDATE THIGNS … 
												-- set_visuals_according_to_days_data_refresh()
												-- bind_event_listeners_for_map_update_on_map_pan_zoom_change()
												-- hide_loading_screen()


								- Ideas of how to store data : 
										¿ do we use the previous approach, or a more OO based new approach? 
											- previously : 
															- actual downloaded data was made into an object
															- and then modified to suit our needs
											- new OO based approach : 
															- have object class 
															- make object instance
															- dump the data there
															- use the methods in the object to process, shape and modify the data into the relevant shape and variables. 

										! Reasons for a (new) OO approach :
															- makes it more modular for different kinds of data. 
															- keeps the methods with the data holding instance, rather than all over the place. 
																( - the downside is that perhaps methods aren't reused… - eg with timestamp creation. how to fix? 
																		- data holder ( eg Particle Matter data holding entity)
																		 could modify the timedate individual data holding entity, using methods from everywhere, 
																		 rather than having all the methods in the inividual timedate data holding entity. 
																		 Having a standard object class for the timedate data holding entity could be a good thing
																		 in terms of standardisation. 
																		 The methods adding and processing data of/to it, could be elsewhere. 
																		 …or could they be with the individual timedata data holding obj?
																		 	\- ¿! how to reduce complexity? 
																		 			- don't work on too many different levels ( eg apply things to the indivudal data obj, 
																		 				rather than make one hop between different levels in the code, possibly causing this errors,
																		 				to run code…  THEN AGAIN, either the processing code will be limited in level skipping, or the class code will be… ).
																		 		-? What would be easier for debugging? 
																		 			- when a method doesn't work too far away from itself… eg in too many different levels… 
																		 				…so one doens't need to send paths too often… 
																		 - IDEA : for the individual timedate object, pass the response_json and the data req metadata to it and 
																		 			have a constructor that sets it up.
																		 			--- ARGHHH: but what about that callback when it finished setting up? 
																		 				- well, the individual timedate object can do that too… 
																		 					… ie to run the check whether all data is ready and loaded… 
																		 					( make a function in the data request object to set the data is loaded flags correctly…
																		 					… with this being called when the individual timedate object had loaded the data … )

											- Building a OO data holder : 
													- What did the old data holder look like? 
														- check here : [days_data_holder]
															- variables : 
																- data_time_period_start
																- data_time_period_end
																- individual_data_sample_length_in_seconds
																- num_of_sample_periods ( looked up I think  )
																- sensor_ids
																- lat_lon
																- data__p1_values
																- data__p2_values
																- parsed_data

													- NOTE : renderer uses the following element of the data : data__p1_values
														- SO : no big need to parse the data! 
														- the parsed_data data was aonly used for the d3 implementation, long ago… 

													- SOLUTION: 
														- just store the data 'as is' at the relevant timedate
						

					- 2019.12.27
						 --- figure out the pathway from state change, to request for new data, to checking, loading, parsing and rendering 
							- to-do : 
									- path : 
										- state change ( change in renderer or date change )
													// MISSING MISSING MISSING 
													// MISSING MISSING MISSING 
													// MISSING MISSING MISSING 
											-- central function ( in renderers or master data holder, or somewhere else ) : ask for needed data to render next frame
												-- COULD IT BE THIS : 
													-- master_renderers_holder__class / data__get_meta_data_on_data_needed_for_frame_render__from_renderers()
														-- &&  each renderer has this function ( called by the above ) report_what_data_is_needed_for_current_frame_render()
													// FIX
													// FIX
													// FIX
											-- renderers should make data request metadata objects ( new root_this.data__data_needed_to_render_frame__metadata_obj … etc…  )
													for the data they need : 
													-- SEE ABOVE ( the function code is missing … )
														-- I guess the eg PM renderer should eg check which time res, day is needed for the next frame, 
															and make a data request metadata obj 

														BUT BUT BUT …
															- THE PM RENDERING OBJECT has this code . 
																-- CHECK THE CODE 
																	-- TRY RUNNING IT ( eg in test code! )
																	-- AND/OR : try running it in the test code, and modifying the dates 
																					( so you have more than just a single day of data to load )
																					OR OR OR ( call the renderer to make new data request objects and change the dates
																								in between the calls, and hopefully get new data request objects (current_data_index) )
													// FIX
													// FIX
													// FIX

											--- master data holder : check/load/process/render command 
													- data request metadata objects are stored here : 
															-- master_data_holding_obj.requested_data__info_objects
													- deduplication of objects happens here : 
															-- master_data_holding_obj.deduplicate__data_objects_about_what_data_to_fetch( root_this, master_data_holding_obj );
													- check/load/go-and-render happens here : 
															-- check_if_data_needed_to_render_frame_is_present__if_not_load__if_yes_render_frame() 
															// MISSING MISSING MISSING 
															// MISSING MISSING MISSING 
															// MISSING MISSING MISSING 
													-- render frame command … 
															// MISSING MISSING MISSING 
															// MISSING MISSING MISSING 
															// MISSING MISSING MISSING 



											-- 

							NOTES : 

								--- ¿¿¿ How do we keep track of current time ? 
									-- there's the current_data_index variable. 
											-- good for the day 
										¿¿¿ how to track time of day? 
											- day decimal value currently, according to the timeline … 
											-- current_timeslider_position_on_bar_as_decimal

											


								--- test functions : 

							        var TEST_data_requested_meta_data_obj_creation_and_deduplication = function( root_this ){
							            console.log(">>>> TEST_data_requested_meta_data_obj_creation_and_deduplication() ");

							            // make objecst 
							            master_renderers_holder.renderers[ 0 ].setup_test_data_request_metadata_objects( root_this );            

							            console.log("--- just set up some data request objects - they're "+master_data_holding_obj.requested_data__info_objects.length );

							            // deduplicate 
							            master_data_holding_obj.deduplicate__data_objects_about_what_data_to_fetch( root_this, master_data_holding_obj );

							            console.log("\t --- master_data_holding_obj data request objects ( count : "+ master_data_holding_obj.requested_data__info_objects.length+") look like this : ");

							            console.log( master_data_holding_obj.requested_data__info_objects );

							            console.log("\n ||||| TEST_data_requested_meta_data_obj_creation_and_deduplication() : DONE ------- ");
							        }


							        var TEST_data_requested_meta_data_obj_creation_and_deduplication__AND__check__check_load_render_function = function( root_this ){
							            console.log(">>>> TEST_data_requested_meta_data_obj_creation_and_deduplication__AND__check__check_load_render_function() ");

							            // do the data request object checkign 
							            TEST_data_requested_meta_data_obj_creation_and_deduplication( root_this );

							            // then run the check / load / render function 
							            master_data_holding_obj.check_if_data_needed_to_render_frame_is_present__if_not_load__if_yes_render_frame( root_this, master_data_holding_obj );

							            console.log("\n ||||| TEST_data_requested_meta_data_obj_creation_and_deduplication__AND__check__check_load_render_function() : DONE ------- ");
							        }




		-------- 2019-12-20 : HOW TO MAKE A PLAY BUTTON : 

				> update_d3_layer__NEW_NEW:
					- draws the map daa, based on :
						-- current_day_data_index

				> current_day_data_index
				- Function to get current_day_data_index based on current slider position as decimal value ( current_timeslider_position_on_bar_as_decimal )
					-- get_time_of_day_accoridng_to_curr_time_slider_decimal_position

				> Decimal slider position  
				- This variable is used in establishing the position of the time indicator 
					-- current_timeslider_position_on_bar_as_decimal	
				- Function used to go from decimal time marker position to time of day : 
					-- get_time_of_day_accoridng_to_curr_time_slider_decimal_position

				> get_time_of_day_accoridng_to_curr_time_slider_decimal_position
					- uses : 
						-- current_timeslider_position_on_bar_as_decimal
				> update_time_slider_text_to_show_current_time_of_day() 

				--- NOTES : 
						- one would still need to figure out when the last day value would be. 
							- get the UTC time and calculate decimal position? 

						- play function would need to :
							- do automatic increments of time ( do set time step too )
							- stop at the end.
							- update the interface on each step
							- update the play/stop button … 






































