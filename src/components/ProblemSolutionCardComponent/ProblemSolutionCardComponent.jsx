import styles from './ProblemSolutionCardComponent.module.css'

function ProblemSolutionCardComponent({ problemStatement, problemSolution }) {
    return (
        <div className={styles.problem_solution_card_container}>
            <h1 className={styles.problem_solution_card_title}>Problem.</h1>
            <p className={styles.problem_solution_card_description}>
                {problemStatement}
            </p>
            <h1 className={styles.problem_solution_card_title}>Solution.</h1>
            <p className={styles.problem_solution_card_description}>
                {problemSolution}
            </p>
        </div>
    )
}

export default ProblemSolutionCardComponent
