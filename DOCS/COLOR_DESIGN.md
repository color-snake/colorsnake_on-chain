# Colorsnake Design

This document contains a copy of colorsnake design points.


Colors

Light
```palette
#D2F5D6
#ED7936
#8E93EB
#ED4584
#F6C288
#6CEDEE
#FD74F1
```
Dark
```palette
#300F31
#214D88
#9A281E
#5EC795
#4899D1
#848046
#5F9D41
```

```css
:root {
  --primary-color: #D2F5D6;
  --primary-text-color: #FFFFFF; /* display mix blend mode different */
  --color-1: #ED7936;
  --color-2: #8E93EB;
  --color-3: #ED4584;
  --color-4: #F6C288;
  --color-5: #6CEDEE;
  --color-6: #FD74F1
}

@media (prefers-color-scheme: dark) {
  :root {
   --primary-color: #300F31;
  --primary-text-color: #FFFFFF; /* display mix blend mode different */
  --color-1: #214D88;
  --color-2: #9A281E;
  --color-3: #5EC795;
  --color-4: #4899D1;
  --color-5: #848046;
  --color-6: #5F9D41
  }
}
```


---


font junegull, use local font file