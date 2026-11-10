import React from 'react';

class TaskList extends React.Component {
  static tasks = [
    { id: 1, text: 'Переглянути плани на тиждень' },
    { id: 2, text: 'Завершити поточні справи' },
    { id: 3, text: 'Виділити час на відпочинок' },
  ];

  addTask = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const text = new FormData(form).get('task').trim();

    if (!text) {
      return;
    }

    const nextId = TaskList.tasks.reduce(
      (largestId, task) => Math.max(largestId, task.id),
      0,
    ) + 1;

    TaskList.tasks.push({ id: nextId, text });
    form.reset();
    this.forceUpdate();
  };

  deleteTask = (id) => {
    TaskList.tasks = TaskList.tasks.filter((task) => task.id !== id);
    this.forceUpdate();
  };

  render() {
    const { tasks } = TaskList;

    return (
      <section className="task-card" aria-labelledby="task-title">
        <header className="card-header">
          <div className="eyebrow">ТВІЙ ПРОСТІР ДЛЯ СПРАВ</div>
          <h1 id="task-title">Список завдань</h1>
          <p>Записуй важливе та рухайся вперед крок за кроком.</p>
        </header>

        <form className="task-form" onSubmit={this.addTask}>
          <label className="visually-hidden" htmlFor="new-task">
            Нове завдання
          </label>
          <input
            id="new-task"
            name="task"
            type="text"
            placeholder="Наприклад, купити продукти"
            autoComplete="off"
          />
          <button className="add-button" type="submit">
            Додати
          </button>
        </form>

        <div className="list-heading">
          <h2>Мої завдання</h2>
          <span className="task-count">{tasks.length}</span>
        </div>

        {tasks.length > 0 ? (
          <ul className="task-items">
            {tasks.map((task) => (
              <li className="task-item" key={task.id}>
                <span className="task-marker" aria-hidden="true" />
                <span className="task-text">{task.text}</span>
                <button
                  className="delete-button"
                  type="button"
                  aria-label={`Видалити завдання: ${task.text}`}
                  onClick={() => this.deleteTask(task.id)}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <span className="empty-mark" aria-hidden="true">✓</span>
            <p>Список порожній — саме час додати перше завдання.</p>
          </div>
        )}

        <footer className="card-footer">
          Завдання зберігаються у списку до перезавантаження сторінки
        </footer>
      </section>
    );
  }
}

export default TaskList;
