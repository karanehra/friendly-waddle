#include <stdio.h>

#include <string>
#include <SDL2/SDL.h>
SDL_Window *gameWindow;
SDL_Renderer *globalRenderer;
SDL_Rect forwardSprites[4];
bool setupSprites();

bool initialize()
{
  printf("Initializing... \n");
  bool success = false;
  if (SDL_Init(SDL_INIT_VIDEO) < 0)
  {
    printf("SDL Initializing Failed... %s \n", SDL_GetError());
  }
  else
  {
    printf("Creating window");
    gameWindow = SDL_CreateWindow("Jumper", SDL_WINDOWPOS_CENTERED,
                                  SDL_WINDOWPOS_CENTERED, 300,
                                  300, SDL_WINDOW_SHOWN);

    if (gameWindow == NULL)
    {
      printf("Window creation failed... %s \n", SDL_GetError());
    }
    else
    {
      printf("Creating Renderer");
      globalRenderer = SDL_CreateRenderer(
          gameWindow,
          -1, SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC);

      if (globalRenderer == NULL)
      {
        printf("Renderer Creation failed... %s \n", SDL_GetError());
      }
    }
  }
  return success;
}

int main(int argc, char *args[])
{
  int currentSprite = 0;
  if (!initialize())
  {
    exit(2);
  }
  else
  {

    bool quitEventLoop = false;
    SDL_Event event;
    while (!quitEventLoop)
    {
      while (SDL_PollEvent(&event) != 0)
      {
        if (event.type == SDL_QUIT)
        {
          quitEventLoop = true;
        }
      }
    }

    return 0;
  }
}