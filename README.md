# Iron-Quizzes

## Code Standards

* Proper indentation with tabs.
* Singles quotes in JavaScript.
* Double quotes in HTML/JSX.
* CamelCase in JavaScript.
* Dash-case in CSS.
* 'Get Skeleton' for CSS framework.
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

**Question Model**

>`questionTitle: string` <br>
>`questionContent: string` <br>
>`questionChoices: array` <br>
>`correctChoice: string` <br>
>`quizId: pointer` <br>

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


