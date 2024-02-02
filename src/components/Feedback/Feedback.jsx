import { useState } from 'react';
import styles from './Feedback.module.css';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Section from './Section';
import Notification from './Notification';

const voteOptions = ['good', 'neutral', 'bad'];

const Feedback = () => {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const countTotalFeedback = () => {
    const { good, neutral, bad } = state;
    return good + neutral + bad;
  };

  const total = countTotalFeedback();

  const countPositiveFeedbackPercentage = () => {
    const { good } = state;
    if (total === 0) {
      return 0;
    }
    return Number(((good / total) * 100).toFixed(2));
  };

  const percent = countPositiveFeedbackPercentage();

  const onLeaveFeedback = keyName => {
    setState(prevState => ({
      ...prevState,
      [keyName]: prevState[keyName] + 1,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <Section title={'Please leave feedback ❤️'}>
        <FeedbackOptions options={voteOptions} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title={'Statistics 📊'}>
        {Boolean(total) && <Statistics good={state.good} neutral={state.neutral} bad={state.bad} total={total} positivePercentage={percent} />}
        {Boolean(!total) && <Notification message="There is no feedback" />}
      </Section>
    </div>
  );
};

export default Feedback;
