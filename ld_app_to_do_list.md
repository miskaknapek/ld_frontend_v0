# LD app : to-do list 
———————————————


## New to-do list 



### Short term


- Move the calendar ot the right side of the screen 
and the contextual menu to the left side of the screen

- Clear the drawing area when here is no data. 

- ** Add luftdaten attribution! ** 
	- how? :
				-  a mention of luftdaten
				-  link to the betterplace campaign 

- Add a contextual menu 
	- check about making a design that's compatible with both a verticl and horisontal time-slider
	- ideall it's located in the top left … 

- Think about content of the contextual menu?! 
	- Change between p1 and p2? 

- Produce new rendering modes : 
	- Bivariate? 
	- area ploting … 
		- aggregate values ( mean? )
		- hybrid plots : 
			- max / mean / min
			- value distributions… ( a bit like a histogram )
			- sparkplots? ( they're likely to show more value change than colours…or? )

- Add timescale functionality … 
	- make it object oriented, so one can have several time-series on screen at the same time… 
	- varible scale time series window 
	- scrollable ( for different times … )
	- moveable on screen
	- R
	- AREA SELECTOR… 
		- different modes? 
			- whole screen as selection … mode.
			- individual selection area 
				( with an arrow to the plotting area that is plotting it… )




### Medium term

- Add a timeslider to the right hand side of the screen, for easier thumb-scrolling, when on mobile. 
	- You could leave the bits for the top-screen horisontal time-slider, the overhead is likely small… 
		… details may vary 

- Think about doing a particle simulation for wind movement simulation… 
( particle speed relative to wind speed? )



### Long term

- Think about how to include humidity data 
	- Eg look for weather services that gather that data and distribute it. 
	- Could also get it from the sensor, where applicable … 








## OLD version 


### Short term to-doo list 

general 
- make vertical side-time-control on the right 
- make regularly publishing loop 
- improve visuals

visualisation
- convert to drawing with canvas ( < learn! ) 
- divie the view up into regions… 

interface
- play control?
- menu menu? 

data science
- check that data is scraped regularly


### Longer term to-do list : 

general 
- make it possible to see and export time-series. 
-- And all the viewing matters related to these : 
- make it possible to select areas for which one sees time series. 
- make it possible to embed lat/lon, current time and playback time in url 
-- make it possible to set custom playback times in the url .

visualisation 
- add humidity data
- add vind vectors
- add ship positions 

data science: 
- figure out what to do with missing values
-- lat/lon 
-- sensor values 
-- sample windows


#### what's good to learn ?! : 

- canvas on maps
- 3d 
- projections … 