import ax from 'utils/ax'

const base = process.env.NODE_ENV === 'development' ? '/cst/api/' : 'HOST_API'

export const detail = (id) => ax.get(base + `store/${id}`)
export const contactAdd = (data) => ax.post(base + `contact/add`, data)
export const search = (data) => ax.get(base + `store/query`, data)
export const homeInfo = () => ax.get(base + `home/info`)

