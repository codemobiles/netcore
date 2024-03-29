using System;
using System.Text;
using cmPOSAPI.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;


namespace cmPOSAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            // C# extensions
           services.AddDbContext<DatabaseContext>(options =>
             options.UseSqlServer(Configuration.GetConnectionString("ConnectionSQLServer")));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,   
                    ValidIssuer = Configuration["Jwt:Issuer"],

                    ValidateAudience = true,
                    ValidAudience = Configuration["Jwt:Audience"],

                    ValidateLifetime = true,  
                    ClockSkew = TimeSpan.Zero, // disable delay when token is expire

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                }; 
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins",
                 builder =>
                 {
                     builder.WithOrigins(
                         "http://example.com",
                         "http://localhost:1512959")
                         .AllowAnyHeader()
                         .AllowAnyMethod();
                     //.WithMethods("GET", "POST", "HEAD");
                 });

                options.AddPolicy("AllowAll",
                 builder =>
                 {
                     builder.AllowAnyOrigin()
                     .AllowAnyHeader()
                     .AllowAnyMethod();
                 });

                /*
                    The browser can skip the preflight request
                    if the following conditions are true:
                    - The request method is GET, HEAD, or POST.
                    - The Content-Type header
                       - application/x-www-form-urlencoded
                       - multipart/form-data
                       - text/plain
                */
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowAll");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
