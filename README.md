# React

This is a based on React-Redux where we implement redux-toolkit for the development of the movies web application.

In Movie  App:
<h5>This the basic design of elements in the Movie App</h5>
<p>In this project we built a movies web applucation where we display the Movies List and Details of the movies along with that we also display TvShows/Series when user likes to access it.</p>
<p>we have Home where I hve displayed the list of movies and MovieDeatails page where user can access the deatils of the movie.</p>
<p>I also have 404 Page Not Found file where I get to display the information when page is not found.</p>


                                                             App
                                                              |
                                                              v
                                                |-------------|----------------|
                                                v             v                v
                                                Header       Router          Footer 
                                                               |                                          
                                                               v
                                                 ______________________________
                                                 |             |               |
                                                 v             v               v
                                                 Home       MovieDetails     404(Page Not Found)
                         

Inside  Home:
<h5>This the design that I am implementing inside the Home</h5>
<h6>In this Home I have fetched the data  using UseEffect hook for accessing the fetched data.</h6>
<h6>Inside of Movie Listing I have used useSelector to get the form the store using createAsyncThunk and accessed using map method</h6>
<h6> MovieCard the has the details thst are passed down form Movie Listing and I have accessed it using props and structed  data present inside the API. </h6>


                                                         MovieApp:
                                                         
                                                            App
                                                             |
                                                             V
                                                            Home(Route)
                                                             |
                                                             V
                                                         Movie Listing
                                                             |
                                                             V
                                                         Movie Card
