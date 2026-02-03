from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
  mariadb_user: str
  mariadb_password: str
  mariadb_host: str
  mariadb_database: str
  mariadb_port: int
  react_url: str
  login_sql: str = "select * from test.user where `email` = '{email}' and `password` = '{pwd}'"
  signup_sql: str = "INSERT INTO test.user (`name`,`email`,`password`,`gender`) VALUE ('{name}','{email}','{pwd}',{gender})"
  check_sql: str = "SELECT * FROM test.user where `email` = '{email}'"

  model_config = SettingsConfigDict(
    env_file=".env",
    env_file_encoding="utf-8",
    extra="ignore"
  )

settings = Settings()
