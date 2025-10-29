from flask_marshmallow import Marshmallow

ma = Marshmallow()

class CategoriaSchema(ma.Schema):
    class Meta:
        fields = ('id_role', 'role_name')