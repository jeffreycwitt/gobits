console.log("app.js is running");



const app = {
  title: "Indecision App",
  subtitle: "Put your life in the hands of a computer",
  options: []
}

const onFormSubmit = (e) => {
  e.preventDefault();

  const option = e.target.elements.option.value
  if (option) {
    app.options.push(option)
    e.target.elements.option.value = '';
    renderApp();
  }

}

const removeAll = () => {
  app.options = [];
  renderApp();
}

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length)
  console.log(randomNum);
  const option = app.options[randomNum];
  alert(option);
}

const appRoot = document.getElementById("app");

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? "Here are your options" : "No options"}</p>
    <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
      <button onClick={removeAll}>RemoveAll</button>

      <ol>
        {
          app.options.map((i) =>{ return <li key={i}>{i}</li>})
        }
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option"/>
        <button>Add</button>
      </form>

    </div>
  );

  ReactDOM.render(template, appRoot)
}
renderApp();
