using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using cmPOSAPI.Database;
using cmPOSAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace cmPOSAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/v2/[controller]")] // .../api/v2/product
    public class ProductController : ControllerBase
    {
        ILogger<ProductController> _logger;
        DatabaseContext Context;

        public IHostingEnvironment Env { get; }

        public ProductController(
            IHostingEnvironment Env,
            ILogger<ProductController> logger, DatabaseContext context)
        {
            this.Env = Env;
            _logger = logger;
            Context = context;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            try
            {
                var result = Context.Products.ToList();
                return Ok(new { result = result, message = "request successfully" });
            }
            catch (Exception error)
            {
                _logger.LogError($"Log GetProducts: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        //..../api/v2/product/id
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            try
            {
                var product = Context.Products.SingleOrDefault(p => p.ProductId == id);

                if (product == null)
                {
                    return NotFound();
                }
                return Ok(new { result = product, message = "request successfully" });
            }
            catch (Exception error)
            {
                _logger.LogError($"Log GetProduct: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromForm] Products data)
        {
            try
            {
                String image = await UploadProductImages();
                data.Image = image;

                Context.Products.Add(data);
                Context.SaveChanges();

                return Ok(new { result = data, message = "create product successfully" });
            }
            catch (Exception error)
            {
                _logger.LogError($"Log CreateProduct: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        //...../1234
        [HttpPut("{id}")]
        public async Task<IActionResult>
        EditProduct([FromForm] Products data, int id)
        {
            try
            {
                var product = Context.Products.SingleOrDefault(p => p.ProductId == id);

                if (product == null)
                {
                    return NotFound();
                }

                String image = await UploadProductImages();
                if (!String.IsNullOrEmpty(image))
                {
                    data.Image = image;
                }

                product.Name = data.Name;
                product.Price = data.Price;
                product.Stock = data.Stock;

                Context.Products.Update(product);
                Context.SaveChanges();

                return Ok(new { result = "", message = "update product successfully" });
            }
            catch (Exception error)
            {
                _logger.LogError($"Log UpdateProduct: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var product = Context.Products.SingleOrDefault(p => p.ProductId == id);

                if (product == null)
                {
                    return NotFound();
                }

                Context.Products.Remove(product);
                Context.SaveChanges();

                return Ok(new { result = "", message = "delete product sucessfully" });
            }
            catch (Exception error)
            {
                _logger.LogError($"Log DeleteProduct: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        [HttpGet("images/{name}")]
        public IActionResult ProductImage(string name)
        {
            return File($"~/images/{name}", "image/jpg");
        }


        public async Task<String> UploadProductImages()
        {
            // Note: recommended used async Task
            var files = Request.Form.Files;

            if (files.Count > 0)
            {
                const string folder = "/images/";
                string filePath = Env.WebRootPath + folder;
                string fileName = "";
                //var fileNameArray = new List<String>(); // multiple images case

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                foreach (var formFile in files)
                {
                    fileName = Guid.NewGuid().ToString() + System.IO.Path.GetExtension(formFile.FileName); // unique name
                    string fullPath = filePath + fileName;

                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            await formFile.CopyToAsync(stream);
                        }
                    }

                    // fileNameArray.Add(fileName); // multiple images case
                }

                return fileName;
                //return fileNameArray; // multiple images case
            }
            return String.Empty;
            //return null;      // multiple images case
        }






    }
}