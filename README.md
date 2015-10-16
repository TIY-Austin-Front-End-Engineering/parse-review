# Iron-Quizzes

## Code Standards

* Proper indentation with tabs.
* Singles quotes in JavaScript.
* Double quotes in HTML/JSX.
* CamelCase in JavaScript.
* Dash-case in CSS.
* 'Get Skeleton' for CSS framework.
*  http://getskeleton.com/
* All components should have comments describing them at the top of the file:
    * What they are.
    * What properties are required.
    * What type is each property.
* Suffix all component files names with 'Component'.
* Component variable names should be equal to that file name.
* Classes should be capitalized and suffixed with their type:
    * Models
    * Components
    * Collections
* Descriptive CSS class names.
* Descriptive git commits and branch names.

<hr>

##Models

**User Model**

>`firstname: string` <br>
>`lastname: string` <br>
>`username: string` <br>
>`password: string` <br>
>`teacher: boolean` <br>
>`email: string` <br>
>`cohortId: pointer` <br>

**Question Model**

>`questionTitle: string` <br>
>`questionContent: string` <br>
>`questionChoices: array` <br>
>`correctChoice: string` <br>
>`quizId: pointer` <br>
>`tags: array` <br>

**Student Answer Model**

>`studentCorrect: boolean` <br>
>`studentChoice: string` <br>
>`userId: pointer` <br>
>`questionId: pointer` <br>

**Quiz Model**

>`quizTitle: string`  <br>
>`totalQuestions: number` <br>
>`startTime: Date` <br>
>`expireTime: Date` <br>
>`cohortId: pointer` <br>

**Cohort Model**

>`name: string` <br>
>`location: string` <br>
>`date: string` //example: Fall 2015 <br>


<hr> 

##Style Guide

_Open to Change!_

**Fonts**

* Questrial - Font for **Titles**
* Fanwood Text - Font for **Everything Else**

**Color Palette**

* http://www.colourlovers.com/palette/2209236/Rust_of_the_Story
* NavBar Color `#280036`
* Button Color `#24677F`
* Body Background Color `#FFEBBE`
* Inner Container Color `#934C47`
* :hover Color `#FD9856`

