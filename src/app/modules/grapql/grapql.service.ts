import { Injectable } from '@angular/core';
import { Observable, of, from, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// https://stackblitz.com/edit/angular-graphql-data

const url = 'https://xnyeq.sse.codesandbox.io/graphql'
const userId = 'cjkk9pwww006p0735ufkakd3n'
const readQuery = `{
  listUsers
  {
    name
    lastname
  }
}`

const loginQuery = `{
  login($email: String $password: String) {
    login(email: $email password: $password) {
      token
      user
    }
  }
}`

const loadQuery = `{
  users {
    id
    username
    courses {
      id
      title
      description
      chapters {
        title
        objectives
        description
        lessons {
          title
          content
        }
      }
    }
  }
  
}`

const execute = (type: 'query' | 'mutation', query: string, vars: any = {}): Observable<any> => {
  return from(fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [type]: query, variables: vars }),
    })
    .then(data => data.json())
    .then(data => data['data'])
    .catch(throwError)
  )
}

const query = (query: string, vars: any = {}): Observable<any> => {
  return execute('query', query, vars)
}

const mutation = (mutation: string, vars: any = {}): Observable<any> => {
  const qru = JSON.stringify({
    mutation, variables: vars }
    )
  console.log('qru', qru)
  return execute('mutation', qru)
}

@Injectable()
export class GrapqlService {

  public readData(): Observable<any> {
    return query(readQuery)
  }

  public loadData(): Observable<any> {
    return of({ action: 'load', key: 'val' })
  }

  public login(email: string, password: string): Observable<any> {
    return mutation(loginQuery, { email, password })
  }

}
