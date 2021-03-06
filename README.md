# Project Goal

To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.
# Basic Requirements:

- Server should call the YouTube API continuously in background (async) with some interval (say 10 seconds) for fetching the latest videos for a predefined search query and should store the data of videos (specifically these fields - Video title, description, publishing datetime, thumbnails URLs and any other fields you require) in a database with proper indexes.
- A GET API which returns the stored video data in a paginated response sorted in descending order of published datetime.
- A basic search API to search the stored videos using their title and description.
- Dockerize the project.
- It should be scalable and optimised.

# To RUN:
- Add your Google api key in .env inside API_KEY variable.
- Add your MongoDB config in .env inside MONGO_URL variable.
- Build the Docker Image and run it.

# To test the API:
- API to get the videos ( GET /video )
    - Query parameters
        - page
        - search

Note: Port 3000 is exposed to access the APIs