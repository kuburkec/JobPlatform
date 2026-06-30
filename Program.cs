using backend.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 1. Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. Database (SQLite)
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite("Data Source=jobs.db"));

// 3. Identity & Auth
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

var key = Encoding.ASCII.GetBytes("STRICTLY_32_CHARACTER_LONG_KEY_HERE!!");
builder.Services.AddAuthentication(x => {
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x => {
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// 4. THE BRIDGE (CORS) - Allows React to talk to this APP
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", p => p
        .WithOrigins("https://job-platform-fn5s.vercel.app/") // Put your Vercel link here
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

// 5. Middleware
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowReact");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// 6. Database Auto-Creation
using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureCreated();
}

app.Run();
