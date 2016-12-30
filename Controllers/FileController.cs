using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading;
using Dunkauppresurser2.Hubs;
using Microsoft.AspNetCore.SignalR.Infrastructure;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Dunkauppresurser2.Controllers
{
    [Route("api/[controller]")]
    public class FileController : ApiHubController<Broadcaster>
    {
        public FileController(IConnectionManager signalRConnectionManager) : base(signalRConnectionManager)
        {
        }

        [HttpPost]
        public async Task<IActionResult> UploadAsync(CancellationToken cancellationToken)
        {
            if (!Request.HasFormContentType)
                return BadRequest();

            var form = Request.Form;
            foreach (var formFile in form.Files)
            {
                using (var readStream = formFile.OpenReadStream())
                {   
                    for (var i = 10; i < 101; i = i + 10)
                    {
                        await Clients.All.PercentageWasChanged(i);
                        Thread.Sleep(300);
                    }
                }
            }


            return Ok();
        }
    }
}
