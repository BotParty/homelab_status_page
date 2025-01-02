import * as d3 from "d3";
const lyricsData = [
    { start: 0, end: 3, text: "Welcome to the jungle" },
    { start: 3, end: 6, text: "We've got fun and games" },
    { start: 6, end: 9, text: "We got everything you want" },
    { start: 9, end: 13, text: "Honey, we know the names" }
  ];

export default () => {
  // 1. Create an audio element in the DOM.
  //    Alternatively, you can place <audio> directly in index.html and just grab it by ID.
  const audio = document.createElement("audio");
  audio.controls = true;
  // Replace with your audio file path:
  audio.src = "/static/bohemian_rhapsody.mp3"; 
  audio.id = "karaoke-audio";
  document.body.appendChild(audio);

  // 2. Create a container for our lyrics display.
  const lyricsContainer = d3
    .select("body")
    .append("div")
    .attr("id", "lyrics-container")
    .style("margin-top", "20px");

  // 3. Render the lyrics as separate <p> elements (or divs/spans).
  //    We'll store a reference to each lyric's element so we can highlight them later.
  const lyricElements = lyricsContainer
    .selectAll(".lyric-line")
    .data(lyricsData)
    .enter()
    .append("p")
    .attr("class", "lyric-line")
    .text(d => d.text)
    // Initialize style so they don't start highlighted
    .style("color", "#333")
    .style("font-size", "1.2rem");

  // 4. Listen for time updates from the audio element.
  audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;

    // 5. Find which lyric is active based on currentTime
    lyricsData.forEach((lyric, i) => {
      if (currentTime >= lyric.start && currentTime < lyric.end) {
        // Highlight this lyric
        d3.select(lyricElements.nodes()[i]).style("color", "red");
      } else {
        // Unhighlight
        d3.select(lyricElements.nodes()[i]).style("color", "#333");
      }
    });
  });
}