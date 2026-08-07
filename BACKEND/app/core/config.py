from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    DATABASE_URL: str

    SECRET_KEY: str

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    FRONTEND_URL: str = "http://localhost:3000"

    RAZORPAY_KEY_ID: str = ""

    RAZORPAY_KEY_SECRET: str = ""

    SMTP_HOST: str = ""

    SMTP_PORT: int = 587

    SMTP_USER: str = ""

    SMTP_PASSWORD: str = ""

    SMTP_FROM_EMAIL: str = ""

    SMS_PROVIDER: str = ""

    SMS_API_KEY: str = ""

    SMS_SENDER_ID: str = ""

    PASSWORD_RESET_TOKEN_EXPIRY: int = 60

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()