import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersReducer } from "../../store/reducers/usersReducer";

const Welcome = () => {

  const navigate = useNavigate()
  const dispath = useDispatch()
  const store = useSelector(state => state)

  const [type, setType] = useState(1);

  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  })

  const [regData, setRegData] = useState({
    name: "",
    password: "",
    password1: ""
  })

  const checkUser = () => {
    return store.users.users.find(v => v.name === regData.name)
  }

  const findUser = () => {
    return store.users.users.find(v => v.name === loginData.name && v.password === loginData.password)
  }

  const signIn = () => {
    let user = findUser()
    if (user) {
      dispath(({ type: "add", id: user.id, name: user.name, password: user.password }));
      navigate("/user")
    } else {
      alert("Неверный логин или пароль!")
    }
  }

  const signUp = () => {
    if (regData.password !== regData.password1) {
      alert("Пароли не совпадают!")
      return
    }

    if (checkUser()) {
      alert("Пользователь с таким именем уже есть!")
      return
    }

    dispath(({ type: "addUser", name: regData.name, password: regData.password }))
    alert("Пользователь успешно создан!")

    setRegData({
      name: "",
      password: "",
      password1: ""
    })
  }

  return (
    <>
      <div className="main_layout">
        {type === 1 ?
          <div className="form_login">
            <h2>Вход</h2>
            <input className="input_login" placeholder="Ваш логин" value={loginData.name} onChange={(e) => setLoginData({ ...loginData, name: e.target.value })} />
            <input className="input_login" type="password" placeholder="Ваш пароль" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            <button className="button_login" onClick={signIn} disabled={!loginData.name || !loginData.password}>Войти</button>
            <span className="text_link" onClick={() => setType(2)}>Регистрация</span>
          </div> :
          <div className="form_login">
            <h2>Регистрация</h2>
            <input className="input_login" placeholder="Придумайте логин" value={regData.name} onChange={(e) => setRegData({ ...regData, name: e.target.value })} />
            <input className="input_login" type="password" placeholder="Придумайте пароль" value={regData.password} onChange={(e) => setRegData({ ...regData, password: e.target.value })} />
            <input className="input_login" type="password" placeholder="Повторите пароль" value={regData.password1} onChange={(e) => setRegData({ ...regData, password1: e.target.value })} />
            <button className="button_login" onClick={signUp} disabled={!regData.name || !regData.password || !regData.password1}>Зарегистрироваться</button>
            <span className="text_link" onClick={() => setType(1)}>Логин</span>
          </div>

        }
      </div>
    </>
  );
}

export default Welcome;