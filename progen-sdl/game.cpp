#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <stdio.h>
#include <string>
#include <cmath>
#include <map>

std::map<std::string, int> valueSet;

const int SCREEN_WIDTH = 600;
const int SCREEN_HEIGHT = 600;
const int TILE_SIZE = 10;
int OFFSET_Y = 0;
int OFFSET_X = 0;

bool init();
void close();
SDL_Window *gWindow = NULL;
SDL_Renderer *gRenderer = NULL;

bool init()
{
  bool success = true;

  if (SDL_Init(SDL_INIT_VIDEO) < 0)
  {
    printf("SDL could not initialize! SDL Error: %s\n", SDL_GetError());
    success = false;
  }
  else
  {
    if (!SDL_SetHint(SDL_HINT_RENDER_SCALE_QUALITY, "1"))
    {
      printf("Warning: Linear texture filtering not enabled!");
    }

    gWindow = SDL_CreateWindow("Procedural Generation", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN);
    if (gWindow == NULL)
    {
      printf("Window could not be created! SDL Error: %s\n", SDL_GetError());
      success = false;
    }
    else
    {
      gRenderer = SDL_CreateRenderer(gWindow, -1, SDL_RENDERER_ACCELERATED);
      if (gRenderer == NULL)
      {
        printf("Renderer could not be created! SDL Error: %s\n", SDL_GetError());
        success = false;
      }
    }
  }

  return success;
}

void close()
{
  SDL_DestroyRenderer(gRenderer);
  SDL_DestroyWindow(gWindow);
  gWindow = NULL;
  gRenderer = NULL;
  IMG_Quit();
  SDL_Quit();
}

int noise(int x, int y, int s = 1)
{
  return int(sin((x * 112.33 + y * 718.233) * 437057.545323) * 10000) & 255;
}

void drawRects()
{
  for (int i = 0; i < SCREEN_WIDTH / TILE_SIZE; i++)
  {
    for (int j = 0; j < SCREEN_HEIGHT / TILE_SIZE; j++)
    {
      int a;

      std::string s = std::to_string(i) + "-" + std::to_string(j);
      if (valueSet.find(s) == valueSet.end())
      {
        a = noise(i + OFFSET_X, j + OFFSET_Y);
        valueSet[s] = a;
      }
      else
      {
        a = valueSet[s];
      }

      SDL_Rect fillRect = {i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE};
      SDL_SetRenderDrawColor(gRenderer, a, a, a, 255);
      SDL_RenderFillRect(gRenderer, &fillRect);
    }
  }
}

int main(int argc, char *args[])
{
  if (!init())
  {
    printf("Failed to initialize!\n");
  }
  else
  {
    printf("nitialize!\n");
    drawRects();
    bool quit = false;

    SDL_Event e;

    while (!quit)
    {
      while (SDL_PollEvent(&e) != 0)
      {
        if (e.type == SDL_QUIT)
        {
          quit = true;
        }
        if (e.type == SDL_KEYDOWN)
        {
          switch (e.key.keysym.sym)
          {
          case SDLK_UP:
            OFFSET_Y--;
            drawRects();
            break;
          case SDLK_DOWN:
            OFFSET_Y++;
            drawRects();
            break;
          case SDLK_RIGHT:
            OFFSET_X++;
            drawRects();
            break;
          case SDLK_LEFT:
            OFFSET_X--;
            drawRects();
            break;
          }
        }
      }
      SDL_RenderPresent(gRenderer);
    }
  }

  close();

  return 0;
}