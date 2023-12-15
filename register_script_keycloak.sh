
# Register User

curl --location 'http://www.localhost:8080/auth/realms/master/protocol/openid-connect/token' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'grant_type=client_credentials' \
  --data-urlencode 'client_id=admin-cli' \
  --data-urlencode 'client_secret=dd2sZv8DcGDyKE75PIaaXwfIeGnDmqX5'


curl --location 'http://www.localhost:8080/auth/admin/realms/E-Shop/users' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOZ1F6S25UZ1NsUFpfNjFGZ3Nzb200Vm1uVlBkclJKZnlaQ2xaYnUtUDJJIn0.eyJleHAiOjE3MDI2NzU2ODYsImlhdCI6MTcwMjY3NTYyNiwianRpIjoiMjI1NzZkNzUtMmNkYy00NzcyLWEwNWMtODcyM2U5OTg0YzY0IiwiaXNzIjoiaHR0cDovL3d3dy5sb2NhbGhvc3Q6ODA4MC9hdXRoL3JlYWxtcy9tYXN0ZXIiLCJzdWIiOiIyM2JhNzQ0Zi04MTE1LTQ3MTgtODI3ZS1jMzdjMWQyOWM2OGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRIb3N0IjoiMTcyLjI1LjAuMSIsImNsaWVudElkIjoiYWRtaW4tY2xpIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LWFkbWluLWNsaSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMjUuMC4xIn0.C2wF-Qt5TSI0Su9eIkov54bLqIZ8akiGYyT9WkdGW88JiyzMD0WTKCC092C9Qx0ihZDdqw4Jshg7Pvov3xq-nPIWwGsDtsqCPrDi-E3iNOYvBDU0Ajj1AAblX-Nh2-Q5LD51HdXEawRm9cK4wIF91GVfb-rJFeT81hur0ArFaJHjFACM3HdCvxvYfnYB7FC71YJjUZzavTdYNlo5Kj69_wH9BOQuqZ-rPL22sOkVscaiIXdDPVFB-4wJcBihet0cQCA5rx3rJ2K8vBVZdKNrwGyISZ77eEdzhCUOaxr1oh6b0KEeooUPTPeYiwG2sHO-_8ZzHUnaN6JrCaMbcuBMWA' \
  --data-raw '{
    "email": "test@gmail.com",
    "enabled": true,
    "username": "papou",
    "attributes": {
      "client_id": "frontend-app"
    },
    "groups": ["Sellers"],
    "credentials": [
      {
        "type": "password",
        "value": "123",
        "temporary": false
      }
    ]
  }'

  
# Login User

curl --location 'http://localhost:8080/auth/realms/E-Shop/protocol/openid-connect/token' \
	--header 'Content-Type: application/x-www-form-urlencoded' \
	--data-urlencode 'username=papou2'\
	--data-urlencode 'password=123' \
	--data-urlencode 'client_id=frontend-app' \
	--data-urlencode 'client_secret=t98ozJbXir5V36B2KRgfxJXu4RMknKBL' \
	--data-urlencode 'grant_type=password'


# Logout User

curl --location 'http://localhost:8080/auth/realms/E-Shop/protocol/openid-connect/logout' \
	--header 'Content-Type: application/x-www-form-urlencoded' \
	--data-urlencode 'refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyZjllN2NkOS0yZjAyLTQ0YWQtOTAyNi05MDZkMmMxZDEyYTEifQ.eyJleHAiOjIwMTM3MTU1MzUsImlhdCI6MTcwMjY3NTUzNSwianRpIjoiOTllNjUzZjctNWIwZi00ZjYzLWE0YTEtMWY0ZjQxOWZkYzRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL0UtU2hvcCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hdXRoL3JlYWxtcy9FLVNob3AiLCJzdWIiOiJmOTZhM2YyNC04YmU0LTQwMWMtODQ1MC02ZDI3YTQ3NjEwZmQiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoiZnJvbnRlbmQtYXBwIiwic2Vzc2lvbl9zdGF0ZSI6ImFkZGEyZjc5LTE3Y2MtNDYzMy1hZDc2LTQ2YTEwM2QzOWIzYyIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImFkZGEyZjc5LTE3Y2MtNDYzMy1hZDc2LTQ2YTEwM2QzOWIzYyJ9.7bbfKrTfzJ8Vj-pl8CywVKw7ZFubEMP6D976khp2geY' \
	--data-urlencode 'client_id=frontend-app' \
	--data-urlencode 'client_secret=t98ozJbXir5V36B2KRgfxJXu4RMknKBL'
