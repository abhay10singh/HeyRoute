fetch('https://api-dev.on-demand.io/chat/v1/sessions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'apikey': 'Nl71zZxFwQUpKeIhLRQRokAcI3Xl5zHo'
    },
    body: JSON.stringify({
        pluginIds: [],
        externalUserId: 'user-1'
    })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error('Test failed:', err));