import React from "react";

const StreamCardsAdmin = () => {

    return(
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {broadcasts.map((broadcast) => (
                <div
                  key={broadcast.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <VideoPlayer videoURL={broadcast.videoURL} />
                  <h2 className="text-lg font-semibold mb-2">
                    {broadcast.sportName}
                  </h2>
                  <h3 className="text-sm font-mono mb-2">
                    {broadcast.description}
                  </h3>
                  <p>title: {broadcast.title}</p>
                  <p>Date & Time: {broadcast.dateTime}</p>
                  <p>Venue: {broadcast.venue}</p>
                  <p>Country: {broadcast.country}</p>

                  <div className="mt-4 space-x-2">
                    <FavoriteButton
                      broadcastId={broadcast.id}
                      isFavorite={favorites[broadcast.id] || false}
                      onToggleFavorite={handleToggleFavorite}
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                      onClick={() => console.log("Add Comment")}
                    >
                      Add Comment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
    );
}


export default StreamCardsAdmin;