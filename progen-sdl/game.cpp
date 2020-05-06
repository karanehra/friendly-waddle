#include <stdio.h>

#include <string>
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
SDL_Window *gameWindow;
SDL_Renderer *globalRenderer;
Character mainCharacter;
TextureHelper characterSpriteSheet = NULL;
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
      else
      {
        int imageFlags = IMG_INIT_PNG;
        if (!(IMG_Init(imageFlags) & imageFlags))
        {
          printf("SDL_image could not initialize! SDL_image Error: %s\n",
                 IMG_GetError());
        }
        else
        {
          mainCharacter = Character(globalRenderer);

          if (setupSprites())
          {
            success = true;
          }
        }
      }
    }
  }
  return success;
}

int main(int argc, char *args[])
{
  printf("Hello worls");
  return 0;
}