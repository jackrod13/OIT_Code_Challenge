using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using Code_Challenge.Data;

namespace Code_Challenge.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class WordController : ControllerBase
    {
                private readonly HttpClient _httpClient;

        public WordController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        
        [HttpGet("GetWord")]
        public async Task<IActionResult> GetWord([FromQuery] string difficulty = "easy")
        {
            // Set search pattern based on difficulty (6-letter vs 10-letter)
            string pattern = difficulty == "hard" ? "??????????" : "??????";
            string apiUrl = $"https://api.datamuse.com/words?sp={pattern}&max=25";

            try
            {
                // Call Datamuse API to get a list of random words
                var response = await _httpClient.GetAsync(apiUrl);

                if (!response.IsSuccessStatusCode)
                {
                    // Return error if the external API failed
                    return StatusCode((int)response.StatusCode, new { message = "Failed to fetch word from external API." });
                }

                var json = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Datamuse JSON response: " + json);

                // Parse response into a list of words
                var wordList = JsonSerializer.Deserialize<List<DatamuseWord>>(json);

                if (wordList == null || wordList.Count == 0)
                {
                    return NotFound(new { message = "No words found." });
                }

                // Randomly pick one word from the returned list
                var random = new Random();
                var selectedWord = wordList[random.Next(wordList.Count)].Word;

                // Wrap the word in a model and return it
                var result = new WordModel
                {
                    Word = selectedWord
                };

                return Ok(result); // Respond with 200 OK and the word
            }
            catch (Exception ex)
            {
                // Catch and return any server-side error
                Console.WriteLine("Error fetching word: " + ex.Message);
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }

        // Model to map Datamuse API response format
        private class DatamuseWord
        {
            [JsonPropertyName("word")]
            public string Word { get; set; }
        }
    }
}
