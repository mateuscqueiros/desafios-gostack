import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
	const [repositories, setRepositories] = useState([])

	useEffect(() => {
		api.get('repositories').then(response => {
			setRepositories(response.data)
		})
	}, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
			title: 'React mobile',
			url: 'https://github.com/mateuscqueiros',
			techs: ['Node.js', 'React']
		})

		setRepositories([ ...repositories, response.data ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

		setRepositories(repositories.filter(
			repository => repository.id !== id
		))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
					<li id={repository.id}>
					{repository.title}

						<button onClick={() => handleRemoveRepository(repository.id)}>
							Remover
						</button>
					</li>

				))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
