using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using WouldYouRather.Contexts;
using WouldYouRather.Services;

namespace WouldYouRather
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
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/dist"; });

            services.AddScoped<GameService>();
            services.AddScoped<AnswerService>();
            services.AddScoped<PlayerService>();
            services.AddScoped<PlayService>();

            services.AddSingleton<PlayDataService>();
            
            services.AddDbContextPool<GameContext>(options =>
            {
                var host = Environment.GetEnvironmentVariable("PG_HOST");
                var port = Environment.GetEnvironmentVariable("PG_PORT");
                var database = Environment.GetEnvironmentVariable("PG_DB");
                var username = Environment.GetEnvironmentVariable("PG_USER");
                var password = Environment.GetEnvironmentVariable("PG_PASS");
                
                if (string.IsNullOrEmpty(host) ||
                    string.IsNullOrEmpty(port) ||
                    string.IsNullOrEmpty(database) ||
                    string.IsNullOrEmpty(username) ||
                    string.IsNullOrEmpty(password)
                    ) {
                    throw new NullReferenceException("Missing connection string provided as environment variables");
                }

                options.UseNpgsql($"Host={host};Port={port};Database={database};Username={username};Password={password}")
                       .EnableSensitiveDataLogging()
                       .UseSnakeCaseNamingConvention();
            });
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Would You Rather API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSwagger();
            app.UseSwaggerUI(config =>
            {
                config.SwaggerEndpoint("/swagger/v1/swagger.json", "Would You Rather API");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}