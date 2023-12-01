Found this a tricky day one. Initially solved without using regular expressions, just using splits and this funky monkey:
```ts
        const lastDigit = numbers[numbers.length - 1][numbers[numbers.length - 1].length - 1];
```
to get the final digit. Can't just access `numbers[numbers.length - 1]` because at times, there might be three numbers next to eachother, that all end up as the last element of the array, concatenated. So I used that to get the last character of the last array.

Part two then motivated a change in strategy, as doing replaces wouldn't work for things like `eightwo`. So swapped to using regular expressions, and built a list of matches from the regular expression executions, and then picked out the first and last based on index.

There must be a way of combining the two regex's I used into one. I used `/[0-9]/g` for numeric matches and `/(one|two|three|four...)/g` for string matches.