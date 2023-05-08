using System;
using System.Collections.Generic;
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using ZoomIntoSpotify.Utils;

namespace ZoomIntoSpotify.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private IConfiguration m_Configuration;
        private IWebHostEnvironment m_WebHostEnvironment;
        public AuthController(IConfiguration Configuration, IWebHostEnvironment WebHostEnvironment)
        {
            m_Configuration = Configuration;
            m_WebHostEnvironment = WebHostEnvironment;
        }
        
        [HttpGet("get-token")]
        public IActionResult GetToken()
        {
            var v_Code = Request.Query["code"].ToString();
            if (String.IsNullOrWhiteSpace(v_Code))
            {
                return BadRequest();
            }

            var v_SpotifyValues = m_Configuration.GetSection("Spotify");
            var v_IsDevelopment = m_WebHostEnvironment.IsDevelopment();
        
            var v_Body = new Dictionary<string, string>
            {
                {"client_id", v_SpotifyValues["ClientId"]},
                {"client_secret", v_SpotifyValues["ClientSecret"]},
                {"grant_type", "authorization_code"},
                {"code", v_Code},
                {"redirect_uri", v_IsDevelopment ? v_SpotifyValues["RedirectUriDev"] : v_SpotifyValues["RedirectUri"]},
            };

            var v_Result = Requester.Request("https://accounts.spotify.com/api/token", HttpMethod.Post, v_Body);
            var v_Error = v_Result["error"];
            if (v_Error != null)
            {
                return BadRequest(v_Result);
            }
            
            return Ok(v_Result);
        }
        
        // [HttpGet("refresh-token")]
        // public IActionResult RefreshToken()
        // {
        //     var v_Code = Request.Query["code"].ToString();
        //     if (String.IsNullOrWhiteSpace(v_Code))
        //     {
        //         return BadRequest();
        //     }
        //
        //     var v_SpotifyValues = m_Configuration.GetSection("Spotify");
        //
        //     var v_Body = new Dictionary<string, string>
        //     {
        //         {"client_id", v_SpotifyValues["ClientId"]},
        //         {"grant_type", "refresh_token"},
        //         {"refresh_token", v_Code},
        //     };
        //
        //     var v_Result = Requester.Request("https://accounts.spotify.com/api/token", HttpMethod.Post, v_Body);
        //     var v_Error = v_Result["error"];
        //     if (v_Error != null)
        //     {
        //         return BadRequest(v_Result);
        //     }
        //     
        //     return Ok(v_Result);
        // }
    }
}