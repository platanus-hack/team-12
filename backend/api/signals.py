# from django.contrib.auth.models import User
# from django.db.models.signals import post_save
# from django.dispatch import receiver

# from api.models import UserProfile


# # @receiver(post_save, sender=User)
# # def create_user_profile(sender, instance, created, **kwargs):
# #     if created:
# #         try:
# #             UserProfile.objects.create(user=instance)
# #         except Exception as e:
# #             print(f"Error creating UserProfile: {e}")


# # @receiver(post_save, sender=User)
# # def save_user_profile(sender, instance, **kwargs):
# #     profile = getattr(instance, "profile", None)
# #     if profile:
# #         profile.save()
