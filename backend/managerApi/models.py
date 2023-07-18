from django.db import models


# Create your models here.
class Auxiliarytool(models.Model):
    tool_id = models.DecimalField(
        primary_key=True,
        max_digits=10,
        decimal_places=0
    )  # Field name made lowercase.
    tool_name = models.CharField(
        max_length=50,
        db_collation='utf8mb3_general_ci'
    )  # Field name made lowercase.
    min_size = models.CharField(
        max_length=20,
        db_collation='utf8mb3_general_ci'
    )  # Field name made lowercase.

    class Meta:
        db_table = 'AuxiliaryTool'
        app_label = 'managerApi'


class User(models.Model):
    id = models.AutoField(
        primary_key=True,
        verbose_name='ID'
    )  # Field name made lowercase.
    name = models.CharField(
        max_length=50,
        db_collation='utf8mb3_general_ci',
        verbose_name='姓名'
    )  # Field name made lowercase.
    genders = models.CharField(
        max_length=10,
        db_collation='utf8mb3_general_ci',
        verbose_name='性別'
    )  # Field name made lowercase.
    birthday = models.DateField(
        verbose_name='生日'
    )  # Field name made lowercase.
    certificate_number = models.CharField(
        max_length=50,
        db_collation='utf8mb3_general_ci',
        verbose_name='證明編號'
    )  # Field name made lowercase.
    certificate_expiry_date = models.DateField(
        verbose_name='證明期限'
    )  # Field name made lowercase.
    disability_level = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        verbose_name='失能/障礙等級'
    )  # Field name made lowercase.
    disability_category = models.CharField(
        max_length=20,
        db_collation='utf8mb3_general_ci',
        verbose_name='失能類別'
    )  # Field name made lowercase.
    address = models.CharField(
        max_length=100,
        db_collation='utf8mb3_general_ci',
        verbose_name='住址'
    )  # Field name made lowercase.
    phone = models.CharField(
        max_length=20,
        db_collation='utf8mb3_general_ci',
        blank=True,
        null=True,
        verbose_name='電話'
    )  # Field name made lowercase.
    email = models.CharField(
        max_length=50,
        db_collation='utf8mb3_general_ci',
        blank=True,
        null=True,
        verbose_name='電子信箱'
    )  # Field name made lowercase.
    contact_person_phone = models.CharField(
        max_length=20,
        db_collation='utf8mb3_general_ci',
        verbose_name='聯絡人電話'
    )  # Field name made lowercase.
    contact_relationship = models.CharField(
        max_length=20,
        db_collation='utf8mb3_general_ci',
        verbose_name='聯絡人關係'
    )  # Field name made lowercase.
    username = models.CharField(
        max_length=20,
        db_collation='utf8mb3_general_ci',
        verbose_name='帳號'
    )  # Field name made lowercase.
    password = models.CharField(
        max_length=30,
        db_collation='utf8mb3_general_ci',
        verbose_name='密碼'
    )  # Field name made lowercase.
    auxiliary_tool = models.ForeignKey(
        Auxiliarytool,
        models.DO_NOTHING,
        blank=True,
        null=True
    )  # Field name made lowercase.

    class Meta:
        app_label = 'managerApi'
        db_table = 'User'


class Managers(models.Model):
    id = models.AutoField(primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=50,
                            db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    phone = models.CharField(max_length=20,
                             db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    password = models.CharField(max_length=20,
                                db_collation='utf8mb3_general_ci')  # Field name made lowercase.

    def check_password(self, password):
        return self.password == password

    class Meta:
        db_table = 'Managers'
        app_label = 'managerApi'


class Driver(models.Model):
    driver_id = models.AutoField(primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=50,
                            db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    phone = models.CharField(max_length=20,
                             db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    driver_license_number = models.CharField(max_length=30,
                                             db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    password = models.CharField(max_length=30,
                                db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    manger = models.ForeignKey(Managers, models.DO_NOTHING, db_column='Manger_ID', null=True,
                               blank=True)  # Field name made lowercase.

    class Meta:
        db_table = 'Driver'
        app_label = 'managerApi'


class Vehicle(models.Model):
    vehicles_id = models.AutoField(primary_key=True)  # Field name made lowercase.
    location = models.CharField(max_length=50,
                                db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    car_number = models.CharField(max_length=10,
                                  db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    can_wheelchair = models.IntegerField(db_column='Can_Wheelchair')  # Field name made lowercase.
    passenger_number = models.IntegerField(db_column='Passenger_Number')  # Field name made lowercase.

    class Meta:
        db_table = 'Vehicle'
        app_label = 'managerApi'


class CheckList(models.Model):
    id = models.AutoField(primary_key=True)  # Field name made lowercase.
    tire_pressure1 = models.DecimalField(max_digits=10, decimal_places=0, blank=True,
                                         null=True)  # Field name made lowercase.
    tire_pressure2 = models.DecimalField(max_digits=10, decimal_places=0, blank=True,
                                         null=True)  # Field name made lowercase.
    tire_pressure3 = models.DecimalField(max_digits=10, decimal_places=0, blank=True,
                                         null=True)  # Field name made lowercase.
    tire_pressure4 = models.DecimalField(max_digits=10, decimal_places=0, blank=True,
                                         null=True)  # Field name made lowercase.
    engine_oil = models.DecimalField(max_digits=10, decimal_places=0, blank=True,
                                     null=True)  # Field name made lowercase.
    directional_motor_oil = models.DecimalField(max_digits=10, decimal_places=0,
                                                blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'Check_List'
        app_label = 'managerApi'


class Schedule(models.Model):
    id = models.AutoField(primary_key=True)  # Field name made lowercase.
    driver = models.ForeignKey(Driver, models.DO_NOTHING, db_column='Driver', null=True,
                               blank=True)  # Field name made lowercase.
    vehicle = models.ForeignKey(Vehicle, models.DO_NOTHING, db_column='Vehicle')  # Field name made lowercase.
    date = models.DateField(db_column='Date')  # Field name made lowercase.
    start_mileage = models.DecimalField(max_digits=10, decimal_places=0, blank=True,
                                        null=True)  # Field name made lowercase.
    end_mileage = models.DecimalField(max_digits=10, decimal_places=0, blank=True,
                                      null=True)  # Field name made lowercase.
    should_charge = models.DecimalField(max_digits=10,
                                        decimal_places=0)  # Field name made lowercase.
    car_check_list = models.ForeignKey(CheckList, models.DO_NOTHING, null=True,
                                       blank=True)  # Field name made lowercase.
    manager = models.ForeignKey(Managers, models.DO_NOTHING, db_column='Manager', null=True,
                                blank=True)  # Field name made lowercase.

    class Meta:
        db_table = 'Schedule'
        app_label = 'managerApi'


class Appointment(models.Model):
    appointment_id = models.AutoField(primary_key=True)  # Field name made lowercase.
    appointment_user = models.ForeignKey('User', models.DO_NOTHING,
                                         db_column='Appointment_User')  # Field name made lowercase.
    type = models.CharField(max_length=20,
                            db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    date = models.DateField(db_column='Date')  # Field name made lowercase.
    escorts = models.IntegerField(db_column='Escorts')  # Field name made lowercase.
    destination = models.CharField(max_length=50,
                                   db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    status = models.CharField(max_length=20, db_collation='utf8mb3_general_ci',
                              null=True)  # Field name made lowercase.
    schedules = models.ForeignKey('Schedule', models.DO_NOTHING, blank=True,
                                  null=True)  # Field name made lowercase.
    remarks = models.CharField(blank=True,
                               max_length=100,
                               null=True)  # Field name made lowercase.
    manager = models.ForeignKey('Managers', models.DO_NOTHING, blank=True,
                                null=True)  # Field name made lowercase.
    should_pay = models.IntegerField(
        # max_length=99999,
        null=True,
        blank=True
    )
    mileage = models.DecimalField(
        decimal_places=2,
        max_digits=3,
        null=True,
        blank=True
    )

    class Meta:
        db_table = 'Appointment'
        app_label = 'managerApi'
