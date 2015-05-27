# [Easel (for Pablo)](http://k5o.github.io/easel/)

This tool helps users of Buffer's [Pablo](https://buffer.com/pablo) upload their own branded image templates for social sharing. Originally inspired by @shpigford:

![@shpigford tweet](http://i.gyazo.com/6bf60a90d416c7a3def57bce4b784145.png)

Easel dynamically renders your own template like this:

![Easel-enabled tweet](http://i.gyazo.com/55dd510cbc0bc737fb5e36ca3e3ebe0b.png)

## Notes

1. Certain keys are exposed (temporarily) because the app is built entirely within the client. With a server I can obfuscate this and also not have to rely on the Canvas element to generate images. I decided not to use a server on my first go to save money and constrain myself to (mostly) vanilla React.

2. Pablo currently compresses all uploaded images, even if they're uploaded at 1024x512, resulting in some quality loss. Hoping this gets fixed in the future.
