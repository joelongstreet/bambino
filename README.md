# bambino
A series of push button games for my baby. Runs as a systemd service on a Raspberry Pi and presents itself via chrome in kiosk mode.


## Menu
The project will automatically launch to the main menu upon startup. To add new items to the menu, append an object to the categories array within `./menu.js`. The route property must have a matching [pug](https://github.com/pugjs) view file and directory within the `./public` folder.

## Content Types
This project relies on sets of rich media: video, image, and audio. I didn't want to clutter up the repo with these files, so they're stored in dropbox. An alias named `./public/assets` points to a directory in dropbox (alias not stored in the repo).


## APIs
All of the APIs are dynamically built based on the file system. In order for an asset to be picked up by it's respective API, it must conform to the following patterns:

### Quiz
```
|__ assets/quiz
    |__ animals
        |__ _questions
            |__ bird.mp4
            |__ cat.mp4
        |__ bird.jpg
        |__ cat.jpg
```

### Books (Alphabet, numbers, animals, signs)
```
|_ assets/animals
    |_ lion.jpg
    |_ lion.mp3 OR lion.mp4
```

### Sounds
```
|_ assets/sounds
    |_ fail
        |_ sound.mp3
    |_ win
        |_ sound.mp3
```


## Asset Formatter
An asset formatter exists to resize images and videos for faster delivery. It should be run before transferring assets to the pi. To run - `npm run format-assets`.
