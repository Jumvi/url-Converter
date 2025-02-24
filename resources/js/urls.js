function toggleActions(actionId) {
  const actionsPanel = document.getElementById(actionId)
  const allPanels = document.querySelectorAll('[id^="actions-"]')
  allPanels.forEach((panel) => {
    if (panel.id !== actionId) {
      panel.classList.add('hidden')
    }
  })
  actionsPanel.classList.toggle('hidden')
}

async function deleteUrl(event, urlId) {
  event.preventDefault()
  try {
    const response = await fetch(`/delete/${urlId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('input[name="_csrf"]').value,
      },
    })
    if (response.ok) {
      const listItem = document.querySelector(`#deleteForm-${urlId}`).closest('li')
      listItem.remove()
    } else {
      console.error('Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur:', error)
  }
}

function showUpdateForm(urlId, shortUrl, fullUrl) {
  document.querySelectorAll('[id^="actions-"]').forEach((panel) => {
    panel.classList.add('hidden')
  })
  document.querySelectorAll('[id^="updateForm-"]').forEach((form) => {
    form.classList.add('hidden')
  })
  const actionsPanel = document.getElementById(`actions-${urlId}`)
  const updateForm = document.getElementById(`updateForm-${urlId}`)
  if (actionsPanel && updateForm) {
    actionsPanel.classList.remove('hidden')
    updateForm.classList.remove('hidden')
    const shortUrlInput = document.getElementById(`shortUrl-${urlId}`)
    const fullUrlInput = document.getElementById(`fullUrl-${urlId}`)
    if (shortUrlInput && fullUrlInput) {
      shortUrlInput.value = shortUrl
      fullUrlInput.value = fullUrl
    }
  }
}

function hideUpdateForm(urlId) {
  const updateForm = document.getElementById(`updateForm-${urlId}`)
  const actionsPanel = document.getElementById(`actions-${urlId}`)
  if (updateForm && actionsPanel) {
    updateForm.classList.add('hidden')
    actionsPanel.classList.add('hidden')
  }
}

async function updateUrl(event, urlId) {
  event.preventDefault()
  const form = event.target
  try {
    const shortUrl = document.getElementById(`shortUrl-${urlId}`).value
    const fullUrl = document.getElementById(`fullUrl-${urlId}`).value
    const response = await fetch(`/update/${urlId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': form.querySelector('input[name="_csrf"]').value,
      },
      body: JSON.stringify({
        shortUrl: shortUrl,
        fullUrl: fullUrl,
      }),
    })
    if (response.ok) {
      const listItem = form.closest('li')
      listItem.querySelector('.text-primary-lighter').textContent = shortUrl
      listItem.querySelector('.text-gray-400.truncate').textContent = fullUrl
      hideUpdateForm(urlId)
    } else {
      console.error('Erreur lors de la mise à jour')
    }
  } catch (error) {
    console.error('Erreur:', error)
  }
}

// Exporter les fonctions pour les rendre disponibles globalement
window.toggleActions = toggleActions
window.deleteUrl = deleteUrl
window.showUpdateForm = showUpdateForm
window.hideUpdateForm = hideUpdateForm
window.updateUrl = updateUrl
