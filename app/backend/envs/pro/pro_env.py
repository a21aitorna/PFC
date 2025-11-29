import os
from dotenv import load_dotenv

def parse_api_url(env_key, default_value):
    """Obtiene la URL de la variable de entorno y elimina el sufijo '/api'."""
    api_url_from_env = os.getenv(env_key)
    
    if api_url_from_env:
        return api_url_from_env.rstrip('/api')
    else:
        return default_value
    
load_dotenv() 

class ProConfig:
    DEBUG = os.getenv('DEBUG_MODE', 'False') == 'True'
    
    API_BASE_URL = parse_api_url('API_BASE_URL', 'https://tu-dominio-railway.up.railway.app')
    
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS', 'False') == 'True'
    
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.getenv('MYSQL_USER')}:"
        f"{os.getenv('MYSQL_PASSWORD')}@"
        f"{os.getenv('MYSQL_HOST')}:"
        f"{os.getenv('MYSQL_PORT')}/"  # <-- ¡Añadimos el puerto aquí!
        f"{os.getenv('MYSQL_DATABASE')}" # <-- Usamos MYSQL_DATABASE que inyecta Railway
    )
    
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

    ALLOWED_ORIGINS = [os.getenv('FRONTEND_URL', 'http://localhost:3000')]


config = {
    'pro': ProConfig
}

def get_database_config():
    return {
        'MYSQL_HOST': os.getenv('MYSQL_HOST'),
        'MYSQL_USER': os.getenv('MYSQL_USER'),
        'MYSQL_PASSWORD': os.getenv('MYSQL_PASSWORD'),
        'MYSQL_PORT': os.getenv('MYSQL_PORT'),
        'DATABASE_NAME': os.getenv('MYSQL_DATABASE') or os.getenv('DATABASE_NAME'),
    }