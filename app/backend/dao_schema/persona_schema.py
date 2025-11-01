from flask_marshmallow import Marshmallow

ma = Marshmallow()

class PersonaSchema(ma.Schema):
    class Meta:
        fields = ('id_user', 'id_role', 'name', 'surname', 'username', 'born_date', 'library_name', 'is_blocked', 'is_erased', 'block_date', 'delete_date','security_question')