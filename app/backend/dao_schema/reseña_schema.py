from flask_marshmallow import Marshmallow

ma = Marshmallow()

class CategoriaSchema(ma.Schema):
    class Meta:
        fields = ('id_review', 'user_id', 'book_id', 'review_text', 'book_rating', 'creation_date')