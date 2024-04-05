export async function getAllNotes() {
  const response = await fetch(`http://127.0.0.1:1337/api/notes`)
  const data = await response.json();

  const res = {};

  data.data.forEach(({id, attributes: {title, content, slug, updatedAt}}) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt
    })
  })

  return res
}

export async function addNote(data) {
  const response = await fetch(`http://127.0.0.1:1337/api/notes`, {
    method: 'POST',
    headers: {
      Authorization: 'bearer 0b91ea7b08b8507ba92aaf4965871527c05bddf10f1223014c8a9c70b517efe9a72fd626e39a35e9a5f05d63ddb35141fa5c06eec2fc8ef2f0664eda739496dc2895b33626b4878d226972b2ceab60963da9a40fc32c46ea104fac068e37d42b3dd44686ae6bc24343a119b3bc565d1b1d5ee56a122c983e2ec060c80e818526',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json();
  return res.data.attributes.slug
}

export async function updateNote(uuid, data) {
  const {id} = await getNote(uuid);
  const response = await fetch(`http://127.0.0.1:1337/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: 'bearer 0b91ea7b08b8507ba92aaf4965871527c05bddf10f1223014c8a9c70b517efe9a72fd626e39a35e9a5f05d63ddb35141fa5c06eec2fc8ef2f0664eda739496dc2895b33626b4878d226972b2ceab60963da9a40fc32c46ea104fac068e37d42b3dd44686ae6bc24343a119b3bc565d1b1d5ee56a122c983e2ec060c80e818526',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json()
}

export async function getNote(uuid) {
  const response = await fetch(`http://127.0.0.1:1337/api/notes?filters[slug][$eq]=${uuid}`)
  const data = await response.json();
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id
  }
}

export async function delNote(uuid) {
  const {id} = await getNote(uuid);
  const response = await fetch(`http://127.0.0.1:1337/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'bearer 0b91ea7b08b8507ba92aaf4965871527c05bddf10f1223014c8a9c70b517efe9a72fd626e39a35e9a5f05d63ddb35141fa5c06eec2fc8ef2f0664eda739496dc2895b33626b4878d226972b2ceab60963da9a40fc32c46ea104fac068e37d42b3dd44686ae6bc24343a119b3bc565d1b1d5ee56a122c983e2ec060c80e818526',
      "Content-Type": "application/json"
    }
  })
  const res = await response.json()
}

