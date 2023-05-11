import React, { useState } from 'react'

const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
  return (
    <li
      style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
      onClick={() => onToggle(todo.id)}
    >
      {todo.text}
    </li>
  );
});

// 컴포넌트 최적화를 위하여 React.memo를 사용합니다
// TodoList 컴포넌트 또한, 각각의 todo 아이템(TodoItem 컴포넌트)을 렌더링 할 때마다, 해당 아이템의 속성(props)이 변경되었는지를 확인합니다. 
// 변경되지 않았다면, TodoItem 컴포넌트를 불필요하게 재랜더링 하는 것을 막기 위해 TodoItem 컴포넌트도 React.memo 함수로 래핑합니다.
// 따라서, React.memo 함수를 사용함으로써, 불필요한 렌더링을 최소화하여 성능을 향상시킬 수 있습니다.

const TodoList = React.memo(function TodoList({ todos, onToggle }) {

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});


function Redux3Presentation({ todos, onCreate, onToggle }) {
  const [text, setText] = useState('');
  const onChange = e => setText(e.target.value);
  const onSubmit = e => {
    e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
    if(text !== '') {
      onCreate(text);
      setText(''); // 인풋 초기화
    }
    
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          placeholder="할 일을 입력하세요.."
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  )
}

export default Redux3Presentation