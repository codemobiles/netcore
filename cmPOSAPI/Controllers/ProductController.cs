using System;
using System.Linq;
using cmPOSAPI.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace cmPOSAPI.Controllers
{

    [ApiController]
    [Route("/api/v2/[controller]")] // .../api/v2/product
    public class ProductController : ControllerBase
    {
        ILogger<ProductController> _logger;
        DatabaseContext Context;

        public ProductController(ILogger<ProductController> logger, DatabaseContext context)
        {
            _logger = logger;
            Context = context;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            try
            {
                var result = Context.Products.ToList();
                return Ok(result);
            }
            catch (Exception error)
            {
                _logger.LogError("Failed to execute GET");
                return StatusCode(500, new { result = "", message = error });
            }
        }

    }
}