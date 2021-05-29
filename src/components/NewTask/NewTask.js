import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from "../../hooks/use_http";

const NewTask = (props) => {
  const {isLoading, error, sendRequest: sendTaskRequest} = useHttp()

  const createTask = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = {id: generatedId, text: taskText};

    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    await sendTaskRequest({
      url: 'https://react-http-demo-cf6f3-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {text: taskText},
    }, createTask.bind(null, taskText))
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading}/>
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
