using System;
using System.Collections.Generic;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ZoomIntoSpotify.Utils;

namespace ZoomIntoSpotify.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        private IConfiguration m_Configuration;
        public DataController(IConfiguration Configuration)
        {
            m_Configuration = Configuration;
        }
        
        [HttpGet("profile")]
        public ActionResult Profile()
        {
            var v_Token = Request.Query["token"].ToString();
            if (String.IsNullOrWhiteSpace(v_Token))
            {
                return BadRequest();
            }

            var v_Result = Requester.Request("https://api.spotify.com/v1/me", HttpMethod.Get, null, v_Token);
            var v_Error = v_Result["error"];
            if (v_Error != null)
            {
                return BadRequest(v_Result);
            }

            return Ok(v_Result);
        }
    }
}