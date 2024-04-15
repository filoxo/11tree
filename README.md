## API decision docs

### use webc components

- why? 
  - i need to practice using them
  - they're a web standard
  - 11ty's webc aligns my goal with that standard in an extremely performant and convenient way

### use the `tree-` prefix/namespace

for all project webc components.

### no markdown support

at this time. couldn't figure it out in a sensible way but... like, MDX wih WebC components would be nice, right? Doesn't sound like it should be that hard.


## Lessons Learned

- webcomponent names must start with a letter and must contain a hyphen
- webcomponent tags are not self-closing!
  - which made me realize, i'm unsure in what scenarios html elements are and aren't self-closing
