import { useCallback, useRef, useState } from 'react';
import produce from 'immer';

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({
    array: [] as any,
    uselessValue: null
  });

  // input 수정을 위한 함수
  const onChange = useCallback((e: any) => {
    const { name, value } = e.target;
    setForm(
      produce((draft: any) => {
        draft[name] = value;
      })
    );
  },[form]);

  // form 등록을 위한 함수
  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    const info = {
      id: nextId.current,
      name: form.name,
      username: form.username
    };

    // array에 새 항목 등록
    setData(
      produce(draft => {
        draft.array.push(info);
      })
    );

    // form 초기화
    setForm({
      name: "",
      username: ""
    });
    nextId.current += 1;

  },[data, form.name, form.username])

  // 항목을 삭제하는 함수
  const onRemove = useCallback((id: any) => {
    setData({
      ...data,
      array: data.array.filter((info: any) => info.id !== id)
    });
  },[data]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          name='username'
          placeholder='아이디'
          value={form.username}
          onChange={onChange}
        />
        <input 
          name='name'
          placeholder='이름'
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info: any) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}


export default App;
