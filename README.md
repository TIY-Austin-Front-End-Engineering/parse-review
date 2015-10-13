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

>`username: string`
>`password: string`
>`teacher: boolean`
>`email: string`

**Question Model**

>`questionTitle: string`
>`questionContent: string`
>`questionChoices: array`
>`correctChoice: string`
>`quizId: pointer`

**Student Answer Model**

>`studentCorrect: boolean`
>`studentChoice: string`
>`userId: pointer`
>`questionId: pointer`

**Quiz Model**

>`quizTitle: string`
>`totalQuestions: number`
>`startTime: Date`
>`expireTime: Date`


